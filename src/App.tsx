import '@xyflow/react/dist/style.css';
import {Flow} from "./Flow.tsx";
import {counter} from "./jotaiAtoms.ts";
import { useAtom } from 'jotai';
import {AddNode} from "./AddNode.tsx";
import {Intersections} from "./Intersections.tsx";
import {ProximityConnect} from "./ProximityConnect.tsx";
import {Adfs} from "./Adfs.tsx";
import TreeComponent from "./TreeComponent.tsx";
import {ReactFlowProvider} from "@xyflow/react";
import {FloatingEdges} from "./FloatingEdges.tsx";


function App()
{
    const [count, setCounter] = useAtom(counter);
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlowProvider>

            {/*<FlowDebug/>
            Counter: {count}<br/>
            <button
                onClick={()=>setCounter(count+1)}
            >
                Increment
            </button>*/}



            {/*<CharacterCounter/>*/}
            {/*<div style={{padding: '20px', textAlign: 'center', verticalAlign: 'middle'}}><Flow/></div>*/}
            {/*<Flow/>*/}
            {/*<AddNode/>*/}
            {/*<Intersections/>*/}
            {/*    <FloatingEdges/>*/}
            {/*    <ProximityConnect/>*/}
              <TreeComponent/>
            {/*    <Tutorial/>*/}
            {/*    <Adfs/>*/}
            {/*    <Tree/>*/}
                {/*<Threejs/>*/}
                {/*<GraphApp/>*/}
                {/*<FFT/>*/}
            </ReactFlowProvider>
        </div>
    )
}

export default App
