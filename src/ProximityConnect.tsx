import {
    Background,
    Node,
    Edge,
    Position,
    ReactFlow,
    useEdgesState,
    useNodesState,
    addEdge,
    useStoreApi
} from "@xyflow/react";
import React, {type MouseEvent as ReactMouseEvent} from "react";

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

export const ProximityConnect = () =>
{
    const store = useStoreApi();

    const [nodes,setNodes, onNodesChange] = useNodesState([n1, n2]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = React.useCallback ((connection: Connection) => {
        setEdges( (eds) => addEdge( {...connection}, eds ) );
    }, [setEdges] );

    const MIN_DIST = 150;
    const getClosestEdge = React.useCallback(( node: Node ) : Edge | null => {
            const storeNodes = Array.from(store.getState().nodeInternals.values());
            let distance = Number.MAX_VALUE;
            let closestNode = null;
            for ( let i = 0; i < storeNodes.length; i++ )
            {
                const n: Node = storeNodes[i];
                if ( n.id === node.id )
                    continue;

                const dx = n.positionAbsolute.x - node.positionAbsolute.x;
                const dy = n.positionAbsolute.y - node.positionAbsolute.y;
                const d = Math.sqrt(dx * dx + dy * dy);

                if ( d > MIN_DIST)
                    continue;

                if ( d > distance )
                    continue;

                distance = d;
                closestNode = n;

            }

            if ( !closestNode )
                return null;

            const closestNodeIsSource = closestNode.positionAbsolute.x < node.positionAbsolute.x;
            const source = closestNodeIsSource ? closestNode.id : node.id;
            const target = closestNodeIsSource ? node.id : closestNode.id;
            const id = source + '-' + target;
            return  { id, source, target };
        }
        , []);

    const onNodeDrag = React.useCallback((event: ReactMouseEvent, node: Node, nodes: Node[]) => {
            setEdges((es) => {
                const nextEdges = es.filter((e) => e.className !== 'temp');
                const closeEdge = getClosestEdge(node);
                if ( closeEdge )
                {
                    const same = nextEdges.find(f => f.source === closeEdge.source && f.target === closeEdge.target);
                    if (!same) {
                        closeEdge.className = 'temp';
                        nextEdges.push(closeEdge);
                    }
                }

                return nextEdges;
            });
        },
        [getClosestEdge, setEdges]);

    const onNodeDragStop = React.useCallback((event: ReactMouseEvent, node: Node, nodes: Node[]) => {
        setEdges((eds) => {
            const nextEdges = eds.filter(f => f.className !== "temp");
            const closestEdge = getClosestEdge(node);
            if ( closestEdge )
            {
                const same = nextEdges.find(f => f.source === closestEdge.source && f.target === closestEdge.target);
                if (!same) {
                    nextEdges.push(closestEdge);
                }
            }
            return nextEdges;
        });
    }, [getClosestEdge, setEdges]);


    return (
        <div style={{width:"100%", height:"100%"}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeDrag={onNodeDrag}
                onNodeDragStop={onNodeDragStop}
                onConnect={onConnect}
                fitView={true}
            >
                <Background/>
            </ReactFlow>
        </div>
    );
}