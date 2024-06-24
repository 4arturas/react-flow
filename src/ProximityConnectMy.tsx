import {
    addEdge,
    Background,
    Edge,
    Node,
    Position,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useStoreApi
} from "reactflow";
import React, {type MouseEvent as ReactMouseEvent} from "react";
import {Connection} from "@reactflow/core/dist/esm/types/general";

const commonStyle = {
    borderRadius: "100%",
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};
const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: commonStyle
}

const n1: Node = {
    id: 'n1',
    position: { x: 10, y: 10 },
    data: { label: '✋' },
    ...nodeDefaults
}

const n2: Node = {
    id: 'n2',
    position: { x: 100, y: 100 },
    data: { label: '🟧' },
    ...nodeDefaults
}

export const ProximityConnectMy = () =>
{
    const store = useStoreApi();

    const [nodes, setNodes, onNodesChange] = useNodesState([n1, n2]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const MIN_DIST = 150;
    const getClosestEdge = ( node: Node) : Edge | null =>
    {
        const storeNodes = Array.from( store.getState().nodeInternals.values() );
        let minDist = Number.MAX_VALUE;
        let minNode: Node | null = null;
        for ( let i = 0; i < storeNodes.length; i++ )
        {
            const n = storeNodes[i];
            if ( n.id === node.id )
                continue;
            const x = n.positionAbsolute.x-node.positionAbsolute.x;
            const y = n.positionAbsolute.y-node.positionAbsolute.y;
            const d = Math.sqrt( x*x + y*y );
            if ( d > MIN_DIST )
                continue;
            if ( d > minDist )
                continue;
            minDist = d;
            minNode = n;
        } // end for i
        if ( !minNode )
            return null;
        const minNodeClosest = minNode.positionAbsolute.x < node.positionAbsolute.x;
        const source = minNodeClosest ? minNode.id : node.id;
        const target = minNodeClosest ? node.id : minNode.id;
        const id = `${source}-${target}`
        return { id, source, target };
    }

    const onNodeDrag = React.useCallback( (event: ReactMouseEvent, node: Node, nodes: Node[]) => {
        setEdges( (eds) => {
            const nextEdges = eds.filter( f => f.className !== "temp" );
            const closestEdge = getClosestEdge( node );
            if ( closestEdge )
            {
                const same = nextEdges.find( f => f.source === closestEdge.source && f.target === closestEdge.target );
                if ( !same )
                {
                    closestEdge.className = "temp";
                    nextEdges.push( closestEdge );
                }
            } // end if
            return nextEdges;
        });
    }, [] );

    const onNodeDragStop = React.useCallback( (event: ReactMouseEvent, node: Node, nodes: Node[]) => {
        setEdges( (eds) => {
            const nextEdges = eds.filter( f => f.className === "temp" );
            const closestEdge = getClosestEdge( node );
            if ( closestEdge )
            {
                const same = nextEdges.find( f => f.source === closestEdge.source && f.target === closestEdge.target );
                if ( !same )
                {
                    nextEdges.push( closestEdge );
                }
            } // end if
            return nextEdges;
        });
    }, [] );

    return (
        <div style={{width:"100%",height:"100%"}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeDrag={onNodeDrag}
                onNodeDragStop={onNodeDragStop}
                fitView={true}
            >
                <Background/>
            </ReactFlow>
        </div>
    );
}