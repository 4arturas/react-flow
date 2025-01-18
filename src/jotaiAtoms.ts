import { atom } from 'jotai';
import {Edge, Node, Position} from '@xyflow/react';
import {atomWithImmer} from "jotai-immer";

export const counter = atom(0);

export interface IEdgePath
{
    id: string;
    path: string
}

export const edgesPaths = atom<IEdgePath[]>([]);
export const activeEdgesAtom = atom<Edge[]>( [] );

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

export const nodeJotai = atomWithImmer(
    {
        id: `${new Date().getTime()}`,
        position: { x: 0, y: 0 },
        type: "input",
        data: {
            label: "Start"
        },
        // sourcePosition: Position.Right,
        sourcePosition: Position.Bottom,
    } as Node
);

export const nodesJotai = atomWithImmer([
    {
        id: `${new Date().getTime()}0`,
        type: "input",
        data: { label: "Jotai node1" },
        position: { x: 100, y: 100 },
        ...nodeDefaults
    } as Node,
    {
        id: `${new Date().getTime()}1`,
        type: "default",
        data: { label: "ba" },
        position: { x: 100, y: 200 },
        ...nodeDefaults
    } as Node
] as Node[] );


export const edgesJotai = atom([
    {
        id: "1-2",
        source: "1",
        target: "2",
        label: "Hello",
        animated: true
    } as Edge
] as Edge[]);


// GRAPH
const TREE_GRAPH: number[][] = [ // G[i][j] indicates whether the path from the i-th node to the j-th node exists or not
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const createNodesAndEdges = ( GRAPH:number[][] ) =>
{
    const graphEdges = [];
    for ( let j = 0; j < GRAPH.length; j++ )
    {
        for ( let k = 0; k < GRAPH[0].length; k++ )
        {
            const exists = GRAPH[j][k];
            if ( exists === 0 )
                continue;

            const edge = {
                id: `${j}-${k}`,
                source: `${j}`,
                target: `${k}`,
            } as Edge;
            graphEdges.push( edge );

        } // end for k
    } // end for j

    const graphNodes = GRAPH[0].map( (_:number, idx:number) =>
        {
            return {
                id: `${idx}`,
                position: {
                    x: 0,
                    y: 0,
                },
                data: { label: `${idx}`},
                style: {
                    width:30, height:30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }
            } as Node;
        }
    )
    let yPos = 0;
    const verticalSpan = GRAPH.length*5;
    let horizontalSpan = GRAPH.flatMap((f) =>f).reduce(( accumulator:number, currentValue:number) => accumulator + currentValue, 0 )*GRAPH.length;
    for ( let y = 0; y < GRAPH.length; y++ )
    {
        const parent = graphNodes[y];
        const numChildren = GRAPH[y].reduce( (accumulator:number, currentValue:number) => accumulator + currentValue, 0 );
        if ( numChildren === 0 )
            continue;

        let beginLeft = (parent.position.x - ((numChildren-1)*horizontalSpan)/numChildren);
        for ( let x = 0; x < GRAPH[0].length; x++ )
        {
            const exists = GRAPH[y][x];
            if ( exists === 0 )
                continue;

            const child:Node|undefined = graphNodes.find( (f:Node) => f.id === `${x}` );
            if ( !child )
                continue;

            child.position.x = beginLeft;
            child.position.y = yPos+verticalSpan;
            beginLeft += horizontalSpan;
        } // end for x
        if ( numChildren === 0 ) continue;
        yPos += verticalSpan
        horizontalSpan -= GRAPH.length;
    } // end for y
    return { graphNodes, graphEdges };
}

const { graphNodes, graphEdges } = createNodesAndEdges(TREE_GRAPH);

export const jotaiGraphEdges = atom(graphEdges);
export const jotaiGraphNodes = atom(graphNodes);