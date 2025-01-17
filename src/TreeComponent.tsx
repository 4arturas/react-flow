import React, {useCallback, type MouseEvent, useEffect, useState, useRef, ReactElement, FC} from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    ReactFlowProvider,
    useReactFlow,
    useNodesState,
    type Edge,
    type Node, useEdgesState, EdgeChange, OnEdgesChange,
    applyEdgeChanges, ReactFlowInstance, getBezierPath, Position, useInternalNode, applyNodeChanges
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {initialEdges, initialNodes} from "./nodes/tree";
import '@xyflow/react/dist/style.css';
import './index.css';
import {AnimatedSVGEdge} from "@/components/AnimatedSVGEdge";
import {AnimatedNodeEdge} from "@/components/AnimatedNodeEdge";
// import {useAtom} from "jotai/react/useAtom";
// import {counter, edgesJotai, nodesJotai} from "@/components/jotaiAtoms";

import {counter, edgesPaths} from "../components/jotaiAtoms";
import { useAtom } from 'jotai';
import {SavingDataEdge} from "@/components/SavingDataEdge";

type ChildProps = {
    edgesArray: string,
}
const Bumbuliukas: FC<ChildProps> = ({edgesArray}): ReactElement => {
    {
        return <circle
            // style={{filter: `drop-shadow(3px 3px 5px red`}}
            r="5"
            fill="#ff0073"
        >
            <animateMotion dur="1000ms" fill="freeze" path={edgesArray}/>
            <animate attributeName="opacity" from="1" to="0" begin="1000ms" dur="1ms" fill="freeze"/>
        </circle>
    }
}

export default function TreeComponent() {
    const [count, setCounter] = useAtom(counter);
    const [edgesArray, setEdgesArray] = useAtom(edgesPaths);

    const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null)


    const edgeTypes = {
        animatedSvg: AnimatedSVGEdge,
        animatedNode: AnimatedNodeEdge,
        savingDataEdge: SavingDataEdge
    };

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, /*onEdgesChange*/] = useEdgesState(initialEdges);

    const onEdgesChange = useCallback(
        (changes:any[]) => {
            setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
        },
        [setEdges],
    );

/*    const [nodes, setNodes] = useAtom(nodesJotai);
    const [edges, setEdges] = useAtom(edgesJotai);

    const onNodeChange = useCallback(
        (x:Node) => setNodes( (newNode) => applyNodeChanges( x, newNode ) ),
        [setNodes]
    );

    const onEdgeChange = useCallback(
        (x:Edge) => setEdges((eds:Edge[]) => applyEdgeChanges(x, eds)),
        [setEdges]
    );

    const onEdgeConnect = useCallback(
        (x:Edge) => setEdges((eds) => addEdge({ ...x, animated: true }, eds) ),
        [setEdges]
    )*/


    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setEdges((prevEdges) =>
                prevEdges.map((edge) => {

                    /*if (edge.id.startsWith('eWorld-'))
                    {
                        // const source = useStore( React.useCallback((store) =>  store..get(props.source), [props.source] ) );
                        // const sourceNode = useInternalNode(edge.source);
                        // const targetNode = useInternalNode(edge.target);

                        // edge.label = 'xxx';
                        // console.log( edge.data );

                        if (edge.animated) {
                            return { ...edge, type: undefined, animated: false, label: '' };
                        } else {
                            return { ...edge, type: undefined, animated: true, label: 'animated' };
                        }
                    }*/

                    const currentTime = Date.now();
                    edge.animated = currentTime > edge.data.start && currentTime < edge.data.stop;
                    setCounter( count+1 );

                    return edge;
                })
            );
        }, 500);

        return () => clearInterval(intervalRef.current!); // Clear interval on unmount
    }, []);



    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <button>{count}</button>
            { edgesArray && <Bumbuliukas edgesArray={edgesArray[0]?.path} /> }
            <ReactFlow
                nodes={nodes}
                edges={edges}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView={true}
                selectNodesOnDrag={false}
                // onLoad={setRfInstance}
            />
        </div>
    );
}
