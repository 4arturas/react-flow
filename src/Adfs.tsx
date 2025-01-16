import {Edge, MarkerType, Node, Position, ReactFlow, useEdgesState, useNodesState} from "reactflow";
import React from "react";


const styleInactive = {
    backgroundColor:"white",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 90
};
const styleActive = {backgroundColor:"orange"};

const globalNodeAttributes = {
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    style: styleInactive,
}

const globalNodeAttributesRightLeft = {
    targetPosition: Position.Right,
    sourcePosition: Position.Left,
    style: styleInactive,
}

const STATE_00_BROWSER_STARTED = "Start";
const STATE_01_CHECK_IF_THERE_IS_CODE_ATTRIBUTE_IN_THE_URL = "Check if there is a \"code\" attribute in the browser's url";
const STATE_02_CODE_ATTRIBUTE_WAS_NOT_FOUND = "\"code\" attribute was not found";
const STATE_03_CODE_ATTRIBUTE_WAS_FOUND = "\"code\" attribute was found";
const STATE_04_FETCH_CODE_FROM_ADFS = "Fetch \"code\" from ADFS - redirect browser";
const STATE_05_ACQUIRE_JWT_AND_REFRESH_TOKENS = "Acquire JWT and Refresh tokens from BFF using \"code\"";
const STATE_06_SAVE_JWT_AND_REFRESH_TOKENS_INTO_BORWSERS_STORAGE = "Save JWT and Refresh tokens in browsers storage";
const STATE_07_CHECK_IF_REFRESH_TOKEN_HAS_NOT_EXPIRED = "Check if Refresh token has not expired";
const STATE_10_CHECK_IF_JWT_TOKEN_HAS_NOT_EXPIRED = "Check if JWT token has not expired";
const STATE_08_REFRESH_TOKEN_HAS_NOT_EXPIRED = "Refresh token timeout HAS NOT expired";
const STATE_09_REFRESH_TOKEN_HAS_EXPIRED = "Refresh token timeout HAS expired";

const n0_Start = {
    id: STATE_00_BROWSER_STARTED,
    type: "input",
    position: {x: 0, y: 205},
    data: {label: STATE_00_BROWSER_STARTED },
    ...globalNodeAttributes,
    style: {
        ...styleInactive,
        width: 50,
        height: 50,
    }
} as Node;

const n1_CheckAttributeInTheUrl = {
    id: STATE_01_CHECK_IF_THERE_IS_CODE_ATTRIBUTE_IN_THE_URL,
    position: { x: 70, y: 185 },
    data: { label: STATE_01_CHECK_IF_THERE_IS_CODE_ATTRIBUTE_IN_THE_URL },
    ...globalNodeAttributes
} as Node;

const n2CodeAttributeWasNotFound = {
    id: STATE_02_CODE_ATTRIBUTE_WAS_NOT_FOUND,
    position: { x: 260, y: 130 },
    data: { label: STATE_02_CODE_ATTRIBUTE_WAS_NOT_FOUND },
    ...globalNodeAttributes
} as Node;

const n3CodeWasFound = {
    id: STATE_03_CODE_ATTRIBUTE_WAS_FOUND,
    position: { x: 260, y: 250 },
    data: { label: STATE_03_CODE_ATTRIBUTE_WAS_FOUND },
    ...globalNodeAttributes
} as Node;

const n4FetchCodeFromAdfs = {
    id: STATE_04_FETCH_CODE_FROM_ADFS,
    type: "output",
    position: { x: 450, y: 130 },
    data: { label: STATE_04_FETCH_CODE_FROM_ADFS },
    ...globalNodeAttributes,
} as Node;

const n5AcquireJwtAndRefreshTokens = {
    id: STATE_05_ACQUIRE_JWT_AND_REFRESH_TOKENS,
    position: { x: 450, y: 250 },
    data: { label: STATE_05_ACQUIRE_JWT_AND_REFRESH_TOKENS },
    ...globalNodeAttributes,
} as Node;

const n6SaveJWTAndRefreshTokensInBrowsersStorage = {
    id: STATE_06_SAVE_JWT_AND_REFRESH_TOKENS_INTO_BORWSERS_STORAGE,
    position: { x: 650, y: 250 },
    data: { label: STATE_06_SAVE_JWT_AND_REFRESH_TOKENS_INTO_BORWSERS_STORAGE },
    ...globalNodeAttributes,
    style: {
        ...globalNodeAttributes.style,
    }
} as Node;

const n7CheckIfRefreshTokenHasNotExpired = {
    id: STATE_07_CHECK_IF_REFRESH_TOKEN_HAS_NOT_EXPIRED,
    position: { x: 700, y: 400 },
    data: { label: STATE_07_CHECK_IF_REFRESH_TOKEN_HAS_NOT_EXPIRED },
    ...globalNodeAttributesRightLeft,
} as Node;


const n08RefreshTokenHasNotExpired = {
    id: STATE_08_REFRESH_TOKEN_HAS_NOT_EXPIRED,
    position: { x: 500, y: 350 },
    data: { label: STATE_08_REFRESH_TOKEN_HAS_NOT_EXPIRED },
    ...globalNodeAttributesRightLeft,
} as Node;

const n09RefreshTokenHasExpired = {
    id: STATE_09_REFRESH_TOKEN_HAS_EXPIRED,
    position: { x: 500, y: 450 },
    data: { label: STATE_09_REFRESH_TOKEN_HAS_EXPIRED },
    ...globalNodeAttributesRightLeft,
} as Node;

const n10CheckIfJwtTokenHasNotExpired = {
    id: STATE_10_CHECK_IF_JWT_TOKEN_HAS_NOT_EXPIRED,
    position: { x: 300, y: 400 },
    data: { label: STATE_10_CHECK_IF_JWT_TOKEN_HAS_NOT_EXPIRED },
    ...globalNodeAttributesRightLeft,
} as Node;

const gNodes = [
    n0_Start,
    n1_CheckAttributeInTheUrl,
    n2CodeAttributeWasNotFound,
    n3CodeWasFound,
    n4FetchCodeFromAdfs,
    n5AcquireJwtAndRefreshTokens,
    n6SaveJWTAndRefreshTokensInBrowsersStorage,
    n7CheckIfRefreshTokenHasNotExpired,
    n08RefreshTokenHasNotExpired,
    n09RefreshTokenHasExpired,
    n10CheckIfJwtTokenHasNotExpired,
];

const defaultEdgeAttributes = {
    markerEnd: {
        type: MarkerType.Arrow,
    },
    animate: false
}

const e0 = { id: `${n0_Start.id}-${n1_CheckAttributeInTheUrl.id}`, source: n0_Start.id, target: n1_CheckAttributeInTheUrl.id, ...defaultEdgeAttributes };
const e1 ={ id: `${n1_CheckAttributeInTheUrl.id}-${n2CodeAttributeWasNotFound.id}`, source: n1_CheckAttributeInTheUrl.id, target: n2CodeAttributeWasNotFound.id, ...defaultEdgeAttributes };
const e2 ={ id: `${n0_Start.id}-${n3CodeWasFound.id}`, source: n1_CheckAttributeInTheUrl.id, target: n3CodeWasFound.id, ...defaultEdgeAttributes };
const e3 ={ id: `${n2CodeAttributeWasNotFound.id}-${n4FetchCodeFromAdfs.id}`, source: n2CodeAttributeWasNotFound.id, target: n4FetchCodeFromAdfs.id, ...defaultEdgeAttributes };
const e4 ={ id: `${n3CodeWasFound.id}-${n5AcquireJwtAndRefreshTokens.id}`, source: n3CodeWasFound.id, target: n5AcquireJwtAndRefreshTokens.id, ...defaultEdgeAttributes };
const e5 ={ id: `${n5AcquireJwtAndRefreshTokens.id}-${n6SaveJWTAndRefreshTokensInBrowsersStorage.id}`, source: n5AcquireJwtAndRefreshTokens.id, target: n6SaveJWTAndRefreshTokensInBrowsersStorage.id, ...defaultEdgeAttributes };
const e6 ={ id: `${n6SaveJWTAndRefreshTokensInBrowsersStorage.id}-${n7CheckIfRefreshTokenHasNotExpired.id}`, source: n6SaveJWTAndRefreshTokensInBrowsersStorage.id, target: n7CheckIfRefreshTokenHasNotExpired.id, ...defaultEdgeAttributes };

const gEdges: Edge[] = [e0, e1, e2, e3, e4, e5, e6];


export const Adfs = () => {

    type JWT = {
        JWT: string,
        RJWT: string,
        jwtExpireDate: Date, refreshJwtExpireDate: Date
    }
    const [state, setState] = React.useState(STATE_00_BROWSER_STARTED);
    const [tokens, setTokens] = React.useState<JWT>({JWT:"",RJWT:"",jwtExpireDate:new Date(),refreshJwtExpireDate:new Date()});

    const [nodes, setNodes, onNodesChange] = useNodesState(gNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(gEdges);

    const setNextState = React.useCallback( (newSate:string ) => {
        setTimeout(() => {
            switch ( newSate )
            {
                case STATE_06_SAVE_JWT_AND_REFRESH_TOKENS_INTO_BORWSERS_STORAGE:
                    var current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
                    const jwtExpireDate = new Date(current.getTime() + 10*1000 );
                    const refreshJwtExpireDate = new Date(current.getTime() + 45*1000 );
                    const newToken = {
                        JWT: `JWT-${Math.floor(Math.random()*100)}`,
                        RJWT: `RWT-${Math.floor(Math.random()*100)}`,
                        jwtExpireDate, refreshJwtExpireDate
                    };
                    setTokens( newToken );
            }
            setState(newSate)
        }, 2000);
    }, [setState] )

    // const timer = React.useRef<null|number>(null);

    React.useEffect(() => {
        switch (state) {
            case n0_Start.id:
                setNextState( STATE_01_CHECK_IF_THERE_IS_CODE_ATTRIBUTE_IN_THE_URL );
                break;
            case STATE_01_CHECK_IF_THERE_IS_CODE_ATTRIBUTE_IN_THE_URL:
                const params = new URLSearchParams(window.location.search);
                if (params.has("code"))
                    setNextState( STATE_03_CODE_ATTRIBUTE_WAS_FOUND );
                else
                    setNextState( STATE_02_CODE_ATTRIBUTE_WAS_NOT_FOUND );
                break;
            case STATE_02_CODE_ATTRIBUTE_WAS_NOT_FOUND:
                setNextState( STATE_04_FETCH_CODE_FROM_ADFS );
                break;
            case STATE_04_FETCH_CODE_FROM_ADFS:
                window.location.href += "?code=ADFS_CODE"
                break;

            case STATE_03_CODE_ATTRIBUTE_WAS_FOUND:
                setNextState( STATE_05_ACQUIRE_JWT_AND_REFRESH_TOKENS );
                break;

            case STATE_05_ACQUIRE_JWT_AND_REFRESH_TOKENS:
                setNextState( STATE_06_SAVE_JWT_AND_REFRESH_TOKENS_INTO_BORWSERS_STORAGE );
                break;

            case STATE_06_SAVE_JWT_AND_REFRESH_TOKENS_INTO_BORWSERS_STORAGE:
                setNextState( STATE_07_CHECK_IF_REFRESH_TOKEN_HAS_NOT_EXPIRED );
                break;
        } // end switch

        setNodes((nds) =>
            nds.map((node) => {
                let label = node.data.label;
                if ( node.id === n6SaveJWTAndRefreshTokensInBrowsersStorage.id && state === n6SaveJWTAndRefreshTokensInBrowsersStorage.id )
                {
                    label = `${STATE_06_SAVE_JWT_AND_REFRESH_TOKENS_INTO_BORWSERS_STORAGE} JWT: ${tokens.JWT} RJWT: ${tokens.RJWT}`
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        label: label
                    },
                    style: {
                        ...node.style,
                        backgroundColor: state === node.id ? "orange" : "white"
                    }
                };
            }),
        );

        function setArrow( currentState:string, edge: Edge ) : boolean
        {
            return edge.id.endsWith( currentState );
            /*switch ( currentState )
            {
                case n0_Start.id:
                    return edge.id === e0.id;
                case n1_CheckAttributeInTheUrl.id:
                    return edge.id === e1.id || edge.id === e2.id;
                case STATE_02_CODE_ATTRIBUTE_WAS_NOT_FOUND:
                    return edge.id === e3.id
                case STATE_03_CODE_ATTRIBUTE_WAS_FOUND:
                    return edge.id === e4.id
                case STATE_05_ACQUIRE_JWT_AND_REFRESH_TOKENS:
                    return edge.id === e5.id
                case STATE_06_SAVE_JWT_AND_REFRESH_TOKENS_INTO_BORWSERS_STORAGE:
                    return edge.id === e6.id
            }
            return false;*/
        }

        setEdges( (eds) => eds.map((edge) => {
            return {
                ...edge,
                animated: setArrow( state, edge )
            };
        }))

        // Cleanup function to clear the timer
        // return () => clearTimeout(timer);
    }, [state, tokens]);

    return (
        <div style={{width: "100%", height: "100%"}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView={true}
            />
        </div>
    );
}