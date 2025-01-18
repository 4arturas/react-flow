import {
    addEdge,
    Background,
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    Node,
    Edge,
    Position,
    ReactFlow,
    useEdgesState,
    useNodesState, useStore, useStoreApi, useReactFlow
} from "@xyflow/react";
import {useImmerAtom} from "jotai-immer";
import {jotaiGraphEdges, jotaiGraphNodes} from "./jotaiAtoms.ts";


export const Tree = () =>
{
    const [gNodes] = useImmerAtom(jotaiGraphNodes);
    const [gEdges] = useImmerAtom(jotaiGraphEdges);
    const [nodes, setNodes, onNodesChange] = useNodesState(gNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(gEdges);
    return (
        <div style={{width:"100%", height:"100%"}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView={true}
            >
                <Background/>
            </ReactFlow>
        </div>
    );
}