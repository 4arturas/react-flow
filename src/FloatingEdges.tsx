import {createNodesAndEdges} from "./utils.ts";
import React, {useCallback} from "react";
import {
    addEdge,
    Background,
    getBezierPath,
    MarkerType,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useStore
} from "reactflow";

const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges();

import { getEdgeParams } from './utils.js';

function FloatingConnectionLine({ toX, toY, fromPosition, toPosition, fromNode }) {

    if (!fromNode) {
        return null;
    }

    const targetNode = {
        id: 'connection-target',
        width: 1,
        height: 1,
        positionAbsolute: { x: toX, y: toY }
    };

    const { sx, sy } = getEdgeParams(fromNode, targetNode);
    const [edgePath] = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: fromPosition,
        targetPosition: toPosition,
        targetX: toX,
        targetY: toY
    });

    return (
        <g>
            <path style={{color:"red", backgroundColor:"red"}}
                fill="none"
                stroke="#222"
                strokeWidth={1.5}
                className="animated"
                d={edgePath}
            />
            <circle
                cx={toX}
                cy={toY}
                fill="#fff"
                r={3}
                stroke="#222"
                strokeWidth={1.5}
            />
        </g>
    );
}

function FloatingEdge({ id, source, target, markerEnd, style }) {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

    const [edgePath] = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
        targetX: tx,
        targetY: ty,
    });

    return (
        <path
            id={id}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
            style={style}
        />
    );
}



export const FloatingEdges = () =>
{
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({ ...params }, eds)
            ),
        [setEdges]
    );

    const edgeTypes = {
        floating: FloatingEdge,
    };

    return (
        <div style={{width: "100%", height: "100%"}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                edgeTypes={edgeTypes}
                // connectionLineComponent={FloatingConnectionLine}
            >
                <Background/>
            </ReactFlow>
        </div>
    );
}