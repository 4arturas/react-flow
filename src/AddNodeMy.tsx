import {useImmerAtom} from "jotai-immer";
import {nodeJotai} from "./jotaiAtoms.ts";
import {addEdge, Background, ReactFlow, useEdgesState, useNodesState, useReactFlow, Node, Edge} from "reactflow";
import React, {type MouseEvent as ReactMouseEvent, type TouchEvent as ReactTouchEvent} from "react";
import {Connection, OnConnectStartParams} from "@reactflow/core/dist/esm/types/general";

let idx = 0;
const getId = () => `${++idx}`;

export const AddNodeMy = () =>
{
    const [node] = useImmerAtom(nodeJotai);
    const [nodes, setNodes, onNondesChange] = useNodesState([node]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const connectingNodeId = React.useRef<string|null>(null);
    const {screenToFlowPosition} = useReactFlow();

    const onConnect = React.useCallback( (connection: Connection) => {
        connectingNodeId.current = null;
        setEdges( (eds) => addEdge({...connection}, eds) );
    }, [addEdge] );

    const onConnectStart = React.useCallback( (event: ReactMouseEvent | ReactTouchEvent, params: OnConnectStartParams) => {
        connectingNodeId.current = params.nodeId;
    }, [] );

    const onConnectEnd = React.useCallback( (event: MouseEvent | TouchEvent) => {
        if ( !connectingNodeId.current )
            return;

        const isTargetPane = event.target.classList.contains("react-flow__pane");
        if ( !isTargetPane )
            return;

        const id = getId();
        const newNode: Node = {
            id,
            position: screenToFlowPosition({x:event.clientX, y:event.clientY}),
            data: {
                label: `${id}`
            },
        };
        setNodes( n => n.concat( newNode ) );
        const newEdge: Edge = {
            id,
            source: connectingNodeId.current,
            target: newNode.id
        };
        setEdges( eds => eds.concat( newEdge ) );
    }, [setNodes, setEdges, screenToFlowPosition] );

    return (
        <div style={{width:"100%", height:"100%"}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNondesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                fitView={true}
                nodeOrigin={[0.5,0]}
            >
                <Background/>
            </ReactFlow>
        </div>
    );
}