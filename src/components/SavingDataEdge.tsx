import React, {useEffect} from 'react';
import {BaseEdge, getSmoothStepPath, BezierEdge, type EdgeProps, getBezierPath, EdgeLabelRenderer} from '@xyflow/react';
import {useImmerAtom} from "jotai-immer";
import {edgesPaths, IEdgePath} from "@/components/jotaiAtoms";
import {useAtom} from "jotai";

export function SavingDataEdge({
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

    const [edgesArray, setEdgesArray] = useAtom(edgesPaths);

    useEffect(() => {
        const edge: IEdgePath = { id: id, path: edgePath };
        const changedEdgesArray: IEdgePath[] = edgesArray.filter( f => f.id !== id );
        changedEdgesArray.push( edge );
        setEdgesArray( changedEdgesArray );
    }, []);

    return (
        <>
            {/*<BaseEdge id={id} path={edgePath} />*/}
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={{strokeWidth: 1}}/>

        </>
    );
}
