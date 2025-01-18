import React from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    applyEdgeChanges
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {initialEdges, initialNodes, testRandomPath} from "./nodes/tree";
import './index.css';
import { AnimatedSVGEdge } from './components/AnimatedSVGEdge';
import {useAtom} from "jotai";
import {activeEdgesAtom, counter, edgesPaths} from "./jotaiAtoms.ts";
import {AnimatedNodeEdge} from "./components/AnimatedNodeEdge.tsx";
import {SavingDataEdge} from "./components/SavingDataEdge.tsx";

type ChildProps = {
  path: string;
  duration: number;
};

function Bumbuliukas({ path, duration }: ChildProps): JSX.Element
{
  console.log( path );
  const svgContent = `
    <circle r="5" fill="#ff0073">
      <animateMotion dur="${duration}ms" fill="freeze">
        <mpath href="#path" />
      </animateMotion>
      <animate attributeName="opacity" from="1" to="0" begin="${duration}ms" dur="1ms" fill="freeze" />
    </circle>
  `;

  return (
    <svg>
      <path id="path" d={path} fill="none" stroke="transparent" />
      <g dangerouslySetInnerHTML={{ __html: svgContent }} />
    </svg>
  );
}


export default function TreeComponent() {
    const [count, setCount] = useAtom(counter);
    const [activeEdges, setActiveEdges] = useAtom(activeEdgesAtom);
    const [paths] = useAtom(edgesPaths);
    // const [edgesArray, setEdgesArray] = useAtom(edgesPaths);

    const intervalRef = React.useRef<NodeJS.Timeout | null>(null)


    const edgeTypes = {
        animatedSvg: AnimatedSVGEdge,
        animatedNode: AnimatedNodeEdge,
        savingDataEdge: SavingDataEdge
    };

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, /*onEdgesChange*/] = useEdgesState(initialEdges);

    const onEdgesChange = React.useCallback(
        (changes:any[]) => {
            setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
        },
        [setEdges],
    );

    React.useEffect(() => {
        intervalRef.current = setInterval(() => {

            const newCount = ( count + 1 ) % initialEdges.length;
            setCount( newCount );

            setEdges((prevEdges) =>
                prevEdges.map((edge) => {

                  /*if ( edge.type !== "animatedSvg" )
                    edge.type = "animatedSvg";
                  else
                    edge.type = "";*/

                  const path = testRandomPath
                    .filter( (edge) => {
                      const timestampFrom = edge.data.timestampFrom as Date;
                      const timestampTo = edge.data.timestampTo as Date;

                      function timeCondition( timestampFrom: Date, timestampTo: Date ) : boolean
                      {
                        const condition1 = timestampFrom >= new Date();
                        const condition2 = timestampTo >= new Date();
                        const condition = condition1 && condition2;
                        return condition;
                      }
                      const condition = timeCondition( timestampFrom, timestampTo );

                      const newEdgePathArray = [];
                      if ( condition )
                      {
                        const activeEdgeFind = activeEdges.find( activeEdge =>
                        {
                          const condition = timeCondition( activeEdge.data.timestampFrom, activeEdge.data.timestampTo );
                          return activeEdge.id === edge.id && condition;
                        });
                      }

                      return condition;
                    } );
                  // console.log( path );

                    /*if (edge.id.startsWith('eWorld-'))
                    {
                        if (edge.animated) {
                            return { ...edge, type: '', animated: false, label: '' };
                        } else {
                            return { ...edge, type: '', animated: true, label: 'animated' };
                        }
                    }

                    const currentTime = Date.now();
                    edge.animated = currentTime > edge.data.start && currentTime < edge.data.stop;
                    setCounter( count+1 );*/

                    return edge;
                })
            );
        }, 500);

        return () => clearInterval(intervalRef.current!); // Clear interval on unmount
    }, []);



    return (
        <div style={{width: '100vw', height: '100vh'}}>
            {/*<button>{count}</button>*/}
            { paths.length > 0 && 'Hello' }
            <ReactFlow
                nodes={nodes}
                edges={edges}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView={true}
                selectNodesOnDrag={false}
            />
        </div>
    );
}
