import 'reactflow/dist/style.css';
import React from "react";
import {useNodesState, Node, useEdgesState, addEdge, useReactFlow, Edge, ReactFlow} from "reactflow";

const initNode: Node = {
    id: "Node",
    type: "input",
    position: {
        x: 0,
        y: 0
    },
    data: { label: "Node" }
};

let id = 0;
const getId = () => `${id++}`;

export const AddNode = () =>
{
    const ref = React.useRef(null);
    const connectingNode = React.useRef(null);
    const [nodes, setNodes, OnNodesChange] = useNodesState([initNode]);
    const [edges, setEdges, OnEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition } = useReactFlow();

    const onConnect = React.useCallback(
        (params) =>
        {
            connectingNode.current = null;
            setEdges( eds => addEdge( params, eds ) );
        }, []
    );

    const onConnectStart = React.useCallback(
        (_, { nodeId } ) =>
        {
            connectingNode.current = nodeId;
        }, []
    );

    const onConnectEnd = React.useCallback(
        (event) =>
        {
            if ( !connectingNode.current )
                return;
            const targetIsPane = event.target.classList.contains("react-flow__pane");
            if ( !targetIsPane )
                return;

            const id = getId();
            const newNode: Node = {
                id,
                position: screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY
                }),
                data: { label: `Node${id}`},
                origin: [0.5, 0]
            };
            setNodes( (nds) => nds.concat( newNode ) );

            const newEdge: Edge = {
                id,
                source: connectingNode.current,
                target: id
            };
            setEdges( (eds) => eds.concat( newEdge ) );
        }, [screenToFlowPosition]
    );

    return (
        <div ref={ref} style={{height: "100%"}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={OnNodesChange}
                onEdgesChange={OnEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                fitView={true}
                nodeOrigin={[0.5, 0]}
            />
        </div>
    );
}