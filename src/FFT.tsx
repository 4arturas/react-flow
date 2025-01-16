// FFT.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI / 2;

interface FourierComponent {
    real: number;
    imag: number;
    freq: number;
    amp: number;
    phase: number;
}

const dft = (x: number[]): FourierComponent[] => {
    let X: FourierComponent[] = [];
    const N = x.length;

    for (let k = 0; k < N; k++) {
        let real = 0;
        let imag = 0;

        for (let n = 0; n < N; n++) {
            const phi = (TWO_PI * k * n) / N;
            real += x[n] * Math.cos(phi);
            imag -= x[n] * Math.sin(phi);
        }
        real = real / N;
        imag = imag / N;

        let freq = k;
        let amp = Math.sqrt(real * real + imag * imag);
        let phase = Math.atan2(imag, real);

        X[k] = { real, imag, freq, amp, phase };
    }

    return X;
};

const Epicycles = ({
                       x,
                       y,
                       rotation,
                       fourier,
                       time,
                   }: {
    x: number;
    y: number;
    rotation: number;
    fourier: FourierComponent[];
    time: number;
}) => {
    const points: THREE.Vector3[] = [];
    let currX = x;
    let currY = y;

    for (let i = 0; i < fourier.length; i++) {
        const { freq, amp: radius, phase } = fourier[i];
        const prevX = currX;
        const prevY = currY;

        const angle = freq * time + phase + rotation;
        currX += radius * Math.cos(angle);
        currY += radius * Math.sin(angle);

        points.push(new THREE.Vector3(prevX, prevY, 0), new THREE.Vector3(currX, currY, 0));
    }

    return (
        <>
            {points.map((point, index) => (
                <mesh position={point} key={index}>
                    <sphereGeometry args={[1.5, 10, 10]} />
                    <meshBasicMaterial color={0x999999} />
                </mesh>
            ))}
            <Line
                points={points}
                color="white"
                lineWidth={1}
                dashed={false}
            />
        </>
    );
};

const FFTCanvas = () => {
    const [time, setTime] = useState(0);
    const [path, setPath] = useState<THREE.Vector3[]>([]);
    const [fourierX, setFourierX] = useState<FourierComponent[]>([]);
    const [fourierY, setFourierY] = useState<FourierComponent[]>([]);

    const signalX: number[] = [];
    const signalY: number[] = [];
    const radius = 150;
    const center = 250;
    const size = 5;

    useEffect(() => {
        for (let i = 0; i < TWO_PI; i += 0.1) {
            signalX.push(Math.cos(i) * radius);
            signalY.push(Math.sin(i) * radius);
        }

        setFourierX(dft(signalX));
        setFourierY(dft(signalY));
    }, []);

    useFrame(() => {
        const vx = new THREE.Vector3(0, 0, 0);
        const vy = new THREE.Vector3(0, 0, 0);

        if (fourierX.length > 0 && fourierY.length > 0) {
            const { x: vxX } = fourierX.reduce(
                ({ x }, { amp, freq, phase }) => {
                    const angle = freq * time + phase;
                    return { x: x + amp * Math.cos(angle) };
                },
                { x: center }
            );

            const { y: vyY } = fourierY.reduce(
                ({ y }, { amp, freq, phase }) => {
                    const angle = freq * time + phase;
                    return { y: y + amp * Math.sin(angle) };
                },
                { y: center }
            );

            vx.set(vxX, 75, 0);
            vy.set(75, vyY, 0);

            const v = new THREE.Vector3(vx.x, vy.y, 0);
            setPath((prevPath) => [v, ...prevPath].slice(0, 1000));

            setTime((prevTime) => {
                const dt = TWO_PI / fourierY.length;
                const newTime = prevTime + dt;
                return newTime > TWO_PI ? 0 : newTime;
            });
        }
    });

    return (
        <>
            <Epicycles x={center} y={75} rotation={0} fourier={fourierX} time={time} />
            <Epicycles x={75} y={center} rotation={HALF_PI} fourier={fourierY} time={time} />
            <Line
                points={path}
                color="red"
                lineWidth={2}
                dashed={false}
            />
        </>
    );
};

const FFT = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 500], up: [0, 0, 1], near: 0.1, far: 1000 }}
        >
            <color attach="background" args={[0x1f1f1f]} />
            <FFTCanvas />
            <OrbitControls />
        </Canvas>
    );
};

export default FFT;
