import {useAtom} from "jotai";
import {edgesJotai, nodesJotai} from "./jotaiAtoms.ts";

export const FlowDebug = () =>
{
    const [nodes] = useAtom(nodesJotai);
    const [edges] = useAtom(edgesJotai);
    return (
        <>
        <div>{JSON.stringify(nodes)}</div>
        <div>{JSON.stringify(edges)}</div>
        </>
    )
}