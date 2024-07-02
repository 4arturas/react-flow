import {
    Background,
    BaseEdge, EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    ReactFlow,
    useEdgesState,
    useNodesState,
    Node, Edge, Position, useStore
} from "reactflow";
import {createNodesAndEdges} from "./utils.ts";
import React from "react";
import {Connection} from "@reactflow/core/dist/esm/types/general";

const {nodes: initNodes, edges: initEdges} = createNodesAndEdges();

export const FloatingEdges= () =>
{
    const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

    const getIntersectionPoint = React.useCallback( (source:Node, target:Node) => {
        const w = source.width/2;
        const h = source.height/2;
        const x2  = source.positionAbsolute.x+w;
        const y2 = source.positionAbsolute.y+h;
        const x1 = target.positionAbsolute.x+target.width/2;
        const y1 = target.positionAbsolute.y+target.height/2;
        const left = (x1-x2)/source.width;
        const right = (y1-y2)/source.height;
        const xx1 = left-right;
        const yy1 = left+right;
        const a = 1 / (Math.abs(xx1)+Math.abs(yy1));
        const xx2 = a * xx1;
        const yy2 = a * yy1;
        return {
            x: w * (xx2+yy2) + x2,
            y: h * (yy2-xx2) + y2,
        }
    }, [] );

    const getPosition = React.useCallback( (node:Node, intersectionPoint:{x:number,y:number}) => {
        if (intersectionPoint.x <= node.positionAbsolute.x + 1) {
            return Position.Left;
        }
        if (intersectionPoint.x >= node.positionAbsolute.x + node.width - 1) {
            return Position.Right;
        }
        if (intersectionPoint.y <= node.positionAbsolute.y + 1) {
            return Position.Top;
        }
        if (intersectionPoint.y >= node.positionAbsolute.y + node.height - 1) {
            return Position.Bottom;
        }

        return Position.Top;
    }, [getIntersectionPoint] );

    const getEdgeParams = React.useCallback( (source:Node, target:Node) => {
        const sourceIntersection = getIntersectionPoint( source, target );
        const targetIntersection = getIntersectionPoint( target, source );
        const sourcePosition = getPosition( source, sourceIntersection );
        const targetPosition = getPosition( target, targetIntersection );
        return {
            sourceX: sourceIntersection.x,
            sourceY: sourceIntersection.y,
            targetX: targetIntersection.x,
            targetY: targetIntersection.y,
            sourcePosition,
            targetPosition
        }
    }, [getPosition, getIntersectionPoint] );

    const MyEdge : React.FC<EdgeProps> = (props:EdgeProps) =>
    {
        const source = useStore( React.useCallback((store) =>  store.nodeInternals.get(props.source), [props.source] ) )
        if ( !source )
            return;
        const target = useStore( React.useCallback( (store) => store.nodeInternals.get(props.target), [props.target] ) );
        if ( !target )
            return;

        const customEdgeParams = getEdgeParams( source, target );

        const [path, labelX, labelY] = getBezierPath({
            ...customEdgeParams
        });
        return (
            <>
                <BaseEdge path={path} markerEnd={props.markerEnd} style={props.style} />
                <EdgeLabelRenderer>
                    <div style={{
                        position:"absolute",
                        transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: "all"
                    }}>
                        <button className="edgebutton">×</button>
                    </div>
                </EdgeLabelRenderer>
            </>
        );
    }

    const edgeTypes = {
        floating: MyEdge
    }

    return (
        <div style={{width:"100%",height:"100%"}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView={true}
                edgeTypes={edgeTypes}
            >
                <Background/>
            </ReactFlow>
        </div>
    );
}