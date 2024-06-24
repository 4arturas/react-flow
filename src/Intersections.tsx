import {useImmerAtom} from "jotai-immer";
import {nodesJotai} from "./jotaiAtoms.ts";
import {Background, ReactFlow, useEdgesState, useNodesState, useReactFlow} from "reactflow";
import React, {type MouseEvent as ReactMouseEvent} from "react";
import {Node} from "@reactflow/core/dist/esm/types/nodes";

export const Intersections = () =>
{
    const [nodeArr] = useImmerAtom(nodesJotai);
    const [nodes, setNodes, onNodesChange] = useNodesState(nodeArr);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const {getIntersectingNodes} = useReactFlow();
    const onNodeDrag = React.useCallback((event: ReactMouseEvent, node: Node, nodes: Node[]) => {
        const intersections = getIntersectingNodes(node).map( m => m.id );
        setNodes( (nds) => (
            nds.map( n => (
                {
                    ...n,
                    style: intersections.includes(n.id) ? {backgroundColor:"red"} : {}
                }
            ))
        ));
    }, []);

    return (
        <div style={{width:"100%", height:"100%"}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeDrag={onNodeDrag}
                fitView={true}
            >
                <Background/>
            </ReactFlow>
        </div>
    );
}