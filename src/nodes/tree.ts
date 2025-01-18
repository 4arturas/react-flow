import {Edge, Node} from "@xyflow/react";
import { Position } from '@xyflow/react';

const nodeDefaults = {
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: {
        borderRadius: '100%',
        backgroundColor: '#fff',
        width: 120,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};


const worldNodes: Node[] = [
    {"id":"World","position":{"x":1479.1,"y":234},"data":{"label":"World"}},
    {"id":"America","position":{"x":1139.1,"y":162},"data":{"label":"America"}},
    {"id":"Europe","position":{"x":2252.1,"y":162},"data":{"label":"Europe"}},
    {"id":"Canada","position":{"x":324.15,"y":90},"data":{"label":"Canada"}},
    {"id":"Mexico","position":{"x":911.15,"y":90},"data":{"label":"Mexico"}},
    {"id":"USA","position":{"x":1360.1,"y":90},"data":{"label":"USA"}},
    {"id":"England","position":{"x":2044.1,"y":90},"data":{"label":"England"}},
    {"id":"Germany","position":{"x":2450.1,"y":90},"data":{"label":"Germany"}},
    {"id":"Spain","position":{"x":2986.1,"y":90},"data":{"label":"Spain"}},
    {"id":"Toronto","position":{"x":42.148,"y":18},"data":{"label":"Toronto"}},
    {"id":"Montreal","position":{"x":149.15,"y":18},"data":{"label":"Montreal"}},
    {"id":"Vancouver","position":{"x":267.15,"y":18},"data":{"label":"Vancouver"}},
    {"id":"Calgary","position":{"x":380.15,"y":18},"data":{"label":"Calgary"}},
    {"id":"Ottawa","position":{"x":479.15,"y":18},"data":{"label":"Ottawa"}},
    {"id":"Mexico City","position":{"x":596.15,"y":18},"data":{"label":"Mexico City"}},
    {"id":"Guadalajara","position":{"x":731.15,"y":18},"data":{"label":"Guadalajara"}},
    {"id":"Monterrey","position":{"x":858.15,"y":18},"data":{"label":"Monterrey"}},
    {"id":"Puebla","position":{"x":965.15,"y":18},"data":{"label":"Puebla"}},
    {"id":"Tijuana","position":{"x":1061.1,"y":18},"data":{"label":"Tijuana"}},
    {"id":"New York","position":{"x":1171.1,"y":18},"data":{"label":"New York"}},
    {"id":"Los Angeles","position":{"x":1300.1,"y":18},"data":{"label":"Los Angeles"}},
    {"id":"Chicago","position":{"x":1421.1,"y":18},"data":{"label":"Chicago"}},
    {"id":"Houston","position":{"x":1526.1,"y":18},"data":{"label":"Houston"}},
    {"id":"Phoenix","position":{"x":1630.1,"y":18},"data":{"label":"Phoenix"}},
    {"id":"London","position":{"x":1732.1,"y":18},"data":{"label":"London"}},
    {"id":"Manchester","position":{"x":1847.1,"y":18},"data":{"label":"Manchester"}},
    {"id":"Birmingham","position":{"x":1981.1,"y":18},"data":{"label":"Birmingham"}},
    {"id":"Liverpool","position":{"x":2108.1,"y":18},"data":{"label":"Liverpool"}},
    {"id":"Leeds","position":{"x":2209.1,"y":18},"data":{"label":"Leeds"}},
    {"id":"Berlin","position":{"x":2296.1,"y":18},"data":{"label":"Berlin"}},
    {"id":"Hamburg","position":{"x":2397.1,"y":18},"data":{"label":"Hamburg"}},
    {"id":"Munich","position":{"x":2504.1,"y":18},"data":{"label":"Munich"}},
    {"id":"Cologne","position":{"x":2607.1,"y":18},"data":{"label":"Cologne"}},
    {"id":"Frankfurt","position":{"x":2716.1,"y":18},"data":{"label":"Frankfurt"}},
    {"id":"Madrid","position":{"x":2821.1,"y":18},"data":{"label":"Madrid"}},
    {"id":"Barcelona","position":{"x":2929.1,"y":18},"data":{"label":"Barcelona"}},
    {"id":"Valencia","position":{"x":3043.1,"y":18},"data":{"label":"Valencia"}},
    {"id":"Seville","position":{"x":3144.1,"y":18},"data":{"label":"Seville"}},
    {"id":"Zaragoza","position":{"x":3247.1,"y":18},"data":{"label":"Zaragoza"}}
];
const worldEdges: Edge[] = [
    {"id":"eWorld-America","source":"World","target":"America"},
    {"id":"eWorld-Europe","source":"World","target":"Europe"},
    {"id":"eAmerica-Canada","source":"America","target":"Canada"},
    {"id":"eAmerica-Mexico","source":"America","target":"Mexico"},
    {"id":"eAmerica-USA","source":"America","target":"USA"},
    {"id":"eEurope-England","source":"Europe","target":"England"},
    {"id":"eEurope-Germany","source":"Europe","target":"Germany"},
    {"id":"eEurope-Spain","source":"Europe","target":"Spain"},
    {"id":"eCanada-Toronto","source":"Canada","target":"Toronto"},
    {"id":"eCanada-Montreal","source":"Canada","target":"Montreal"},
    {"id":"eCanada-Vancouver","source":"Canada","target":"Vancouver"},
    {"id":"eCanada-Calgary","source":"Canada","target":"Calgary"},
    {"id":"eCanada-Ottawa","source":"Canada","target":"Ottawa"},
    {"id":"eMexico-Mexico City","source":"Mexico","target":"Mexico City"},
    {"id":"eMexico-Guadalajara","source":"Mexico","target":"Guadalajara"},
    {"id":"eMexico-Monterrey","source":"Mexico","target":"Monterrey"},
    {"id":"eMexico-Puebla","source":"Mexico","target":"Puebla"},
    {"id":"eMexico-Tijuana","source":"Mexico","target":"Tijuana"},
    {"id":"eUSA-New York","source":"USA","target":"New York"},
    {"id":"eUSA-Los Angeles","source":"USA","target":"Los Angeles"},
    {"id":"eUSA-Chicago","source":"USA","target":"Chicago"},
    {"id":"eUSA-Houston","source":"USA","target":"Houston"},
    {"id":"eUSA-Phoenix","source":"USA","target":"Phoenix"},
    {"id":"eEngland-London","source":"England","target":"London"},
    {"id":"eEngland-Manchester","source":"England","target":"Manchester"},
    {"id":"eEngland-Birmingham","source":"England","target":"Birmingham"},
    {"id":"eEngland-Liverpool","source":"England","target":"Liverpool"},
    {"id":"eEngland-Leeds","source":"England","target":"Leeds"},
    {"id":"eGermany-Berlin","source":"Germany","target":"Berlin"},
    {"id":"eGermany-Hamburg","source":"Germany","target":"Hamburg"},
    {"id":"eGermany-Munich","source":"Germany","target":"Munich"},
    {"id":"eGermany-Cologne","source":"Germany","target":"Cologne"},
    {"id":"eGermany-Frankfurt","source":"Germany","target":"Frankfurt"},
    {"id":"eSpain-Madrid","source":"Spain","target":"Madrid"},
    {"id":"eSpain-Barcelona","source":"Spain","target":"Barcelona"},
    {"id":"eSpain-Valencia","source":"Spain","target":"Valencia"},
    {"id":"eSpain-Seville","source":"Spain","target":"Seville"},
    {"id":"eSpain-Zaragoza","source":"Spain","target":"Zaragoza"}
];




export const initialNodes =
    // reverseNodes(carTreeNodes)
    reverseNodes(worldNodes)
    .map( (n:Node) => (
        {
            ...n,
            position: { x: n.position.x, y: n.position.y },
            ...nodeDefaults }
    ));

export const initialEdges =
// carTreeEdges
    worldEdges
    .map( e => (
        {
            ...e,
            // type: 'smoothstep',
            // type: 'straight',
            // type: 'step',
            // type: 'bezier',
            // type: 'animatedNode',
            type: 'animatedSvg',
            // type: 'savingDataEdge',
            animated: false,
            // data: { start: 0, stop: 0 }
            data: {
                start: 0, stop: 0,
                timestampFrom: null,
                timestampTo: null,
                activities: [
                    { duration: 1000, color: "red" },
                    { duration: 2000, color: "green" },
                    { duration: 3000, color: "blue" },
                ]
            }
        }
    ));
// initialEdges[0].type = 'animatedSvg';


let currentTime = Date.now()+1000;
// const startNode = 'World';
// const targetNode = 'Canada';
const startNode = 'req-car';
const targetNode = 'req-nimek2bank';
// const targetNode = 'req-encryptm';
export const myTestPath = findPath( initialEdges, startNode, targetNode )?.forEach(e => {
    const step = 1000;
    const data = {
        start: currentTime,
        stop: currentTime+step
    }
    currentTime += step;
    e.data = data;
    // console.log( 'I am here', e );
});




// console.log( findPath( worldEdges, 'World', 'Canada' ) );

function findPath(edges: Edge[], startNodeId: string, endNodeId: string): Edge[] | null {
    if (!edges || edges.length === 0) {
        console.warn("No edges provided or empty edges array.");
        return null;
    }

    const adjList = new Map<string, string[]>();

    // Build adjacency list
    edges.forEach(edge => {
        if (!adjList.has(edge.source)) {
            adjList.set(edge.source, []);
        }
        adjList.get(edge.source)?.push(edge.target); // Use optional chaining
    });

    const visited = new Set<string>();
    const path: string[] = [];

    function dfs(currentNodeId: string): boolean {
        visited.add(currentNodeId);
        path.push(currentNodeId);

        if (currentNodeId === endNodeId) {
            return true; // Path found
        }

        if (adjList.has(currentNodeId)) {
            const neighbors = adjList.get(currentNodeId);
            if (neighbors) {
                for (const neighborId of neighbors) {
                    if (!visited.has(neighborId)) {
                        if (dfs(neighborId)) {
                            return true; // Path found in a recursive call
                        }
                    }
                }
            }
        }

        path.pop(); // Backtrack if no path found from this node
        return false;
    }

    if (dfs(startNodeId)) {
        // Construct the edge path
        const edgePath: Edge[] = [];
        for (let i = 0; i < path.length - 1; i++) {
            const sourceId = path[i];
            const targetId = path[i + 1];
            const edge = edges.find(e => e.source === sourceId && e.target === targetId);
            if (edge) {
                edgePath.push(edge);
            } else {
                console.error("Edge not found in original edges array");
                return null;
            }
        }
        return edgePath;
    }

    return null; // No path found
}

function reverseNodes(nodes: Node[]) : Node[] {
    if (!nodes || nodes.length === 0) {
        console.warn("No nodes provided or empty nodes array.");
        return nodes; // Return original nodes if there's nothing to reverse
    }

    // Find min and max Y
    let minY = Infinity;
    let maxY = -Infinity;

    nodes.forEach(node => {
        if (node.position && typeof node.position.y === 'number') {
            minY = Math.min(minY, node.position.y);
            maxY = Math.max(maxY, node.position.y);
        } else {
            console.warn("Node with invalid position data:", node);
        }
    });

    if (maxY === minY) {
        console.warn("All nodes have the same Y position, no reversing needed.");
        return nodes;
    }

    return nodes.map(node => {
        if (node.position && typeof node.position.y === 'number') {
            return {
                ...node,
                position: {
                    ...node.position,
                    y: maxY - node.position.y + minY
                }
            };
        } else {
            console.warn("Node with invalid position data:", node);
            return node;
        }
    });
}


export function generateRandomEdges(dateFrom: Date, source: string, target: string, edges: Edge[]): Edge[]
{
    const randomEdges: Edge[] = [];
    const path = findPath( edges, source, target ); // Replace "someEndNode" with the actual end node

    if (path) {
        let previousTime = dateFrom;
        for (let i = 0; i < path.length; i++)
        {
            if ( i !== 0 )
            {
                previousTime = randomEdges[i-1].data.timestampTo;
            }

            const edge = path[i];
            const from = 1000;
            const to = 5000;
            const randomMillis = Math.floor(Math.random() * (to - from + 1)) + from;

            const timestampFrom = previousTime;
            const timestampTo = new Date( previousTime.getTime() + randomMillis );
            randomEdges.push({
                ...edge,
                data: {
                    timestampFrom: timestampFrom,
                    timestampTo: timestampTo
                }
            });
        }
    }

    return randomEdges;
}

export const testRandomPath = generateRandomEdges( new Date( new Date().getTime() + 3000 ), "World", "Zaragoza", initialEdges );
// console.log( testRandomPath );
