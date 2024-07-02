import { atom } from 'jotai';
import {Edge, Node, Position} from 'reactflow';
import {atomWithImmer} from "jotai-immer";

export const counter = atom(0);

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