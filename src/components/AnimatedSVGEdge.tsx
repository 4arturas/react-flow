import React from 'react';
import {BaseEdge, getSmoothStepPath, BezierEdge, type EdgeProps, getBezierPath, EdgeLabelRenderer} from '@xyflow/react';

export function AnimatedSVGEdge({
                                    id,
                                    sourceX,
                                    sourceY,
                                    targetX,
                                    targetY,
                                    sourcePosition,
                                    targetPosition,
                                    data,
                                    label,
                                    markerEnd,
                                }: EdgeProps) {
    const [edgePath, labelX, labelY] = getBezierPath({
    // const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            {/*<BaseEdge id={id} path={edgePath} />*/}
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={{strokeWidth: 1}}/>

            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        backgroundColor: '#EEF0F6',
                        fill: '#EEF0F6',
                        pointerEvents: 'all',
                        padding: '4px',
                    }}
                    className="nodrag nopan"
                >
                    {label}
                    {/*Hello*/}
                </div>
            </EdgeLabelRenderer>

            <circle
                // style={{filter: `drop-shadow(3px 3px 5px red`}}
                r="5"
                fill="#ff0073"
            >
                <animateMotion dur="1000ms" fill="freeze" path={edgePath} />
                <animate attributeName="opacity" from="1" to="0" begin="1000ms" dur="1ms" fill="freeze"/>
            </circle>

        </>
    );
}
