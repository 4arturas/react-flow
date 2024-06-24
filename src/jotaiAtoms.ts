import { atom } from 'jotai';
import {Edge, Node, Position} from 'reactflow';
import {atomWithImmer} from "jotai-immer";

export const counter = atom(0);

export const nodeJotai = atomWithImmer(
    {
        id: `${new Date().getTime()}`,
        position: { x: 0, y: 0 },
        type: "input",
        data: {
            label: "Start"
        },
        sourcePosition: Position.Right,
    } as Node
);

export const nodesJotai = atomWithImmer([
    {
        id: `${new Date().getTime()}0`,
        type: "input",
        data: { label: "Jotai node1" },
        position: { x: 100, y: 100 }
    } as Node,
    {
        id: `${new Date().getTime()}1`,
        type: "default",
        data: { label: "ba" },
        position: { x: 100, y: 200 }
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