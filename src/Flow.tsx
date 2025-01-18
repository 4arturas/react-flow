import {addEdge, applyEdgeChanges, applyNodeChanges, Node, Edge, ReactFlow} from "@xyflow/react";
import '@xyflow/react/dist/style.css';

import {useAtom} from "jotai/index";
import {counter, edgesJotai, nodesJotai} from "./jotaiAtoms.ts";
import {useCallback} from "react";



export const Flow = () =>
{
    const [nodes, setNodes] = useAtom(nodesJotai);
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
    )

    const [count] = useAtom(counter);
    return (
        <>
            CTX={count}
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodeChange}
            onEdgesChange={onEdgeChange}
            onConnect={onEdgeConnect}
        >

        </ReactFlow>
        </>
    );
}