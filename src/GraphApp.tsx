import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Line } from '@react-three/drei';

function Axes() {
    const xAxisPoints = [
        [-10, 0, 0],
        [10, 0, 0],
    ];

    const yAxisPoints = [
        [0, -10, 0],
        [0, 10, 0],
    ];

    return (
        <>
            <Line points={xAxisPoints} color="red" lineWidth={2} />
            <Line points={yAxisPoints} color="blue" lineWidth={2} />
        </>
    );
}

function Parabola() {
    const parabolaPoints = useMemo(() => {
        const points = [];
        for (let x = -10; x <= 10; x += 0.1) {
            points.push([x, x ** 2, 0]);
        }
        return points;
    }, []);

    return <Line points={parabolaPoints} color="green" lineWidth={2} />;
}

export const GraphApp = () => {
    return (
        <Canvas
            camera={{ position: [0, 20, 30], fov: 60 }}
            style={{border:"1px solid black", width: 300, height: 300}}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Axes />
            <Parabola />
        </Canvas>
    );
};