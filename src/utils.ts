import {MarkerType, Node, Position} from "reactflow";

function getNodeIntersection(source:Node, target:Node) {

    const w = source.width / 2;
    const h = source.height / 2;

    const x2 = source.positionAbsolute.x + w;
    const y2 = source.positionAbsolute.y + h;
    const x1 = target.positionAbsolute.x + target.width / 2;
    const y1 = target.positionAbsolute.y + target.height / 2;

    const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
    const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
    const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
    const xx2 = a * xx1;
    const yy2 = a * yy1;
    const x = w * (xx2 + yy2) + x2;
    const y = h * (-xx2 + yy2) + y2;

    return { x, y };
}

function getEdgePosition(node:Node, intersectionPoint) {
    if (intersectionPoint.x <= node.positionAbsolute.x)
        return Position.Left;
    if (intersectionPoint.x >= node.positionAbsolute.x + node.width)
        return Position.Right;
    if (intersectionPoint.y <= node.positionAbsolute.y)
        return Position.Top;
    return Position.Bottom;
}

export function getEdgeParams(source:Node, target:Node) {
    const sourceIntersectionPoint = getNodeIntersection(source, target);
    const targetIntersectionPoint = getNodeIntersection(target, source);

    const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
    const targetPos = getEdgePosition(target, targetIntersectionPoint);

    return {
        sx: sourceIntersectionPoint.x,
        sy: sourceIntersectionPoint.y,
        tx: targetIntersectionPoint.x,
        ty: targetIntersectionPoint.y,
        sourcePos,
        targetPos,
    };
}

export function createNodesAndEdges() {
    const nodes = [];
    const edges = [];
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const style = {
        borderRadius: '10%',
        backgroundColor: '#fff',
        width: 70,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    nodes.push({ id: 'target', data: { label: 'Target' }, position: center, style });

    for (let i = 0; i < 8; i++) {
        const degrees = i * (360 / 8);
        const radians = degrees * (Math.PI / 180);
        const x = 250 * Math.cos(radians) + center.x;
        const y = 250 * Math.sin(radians) + center.y;

        nodes.push(
            {
                id: `${i}`,
                data: {label: 'Source'},
                position: {x, y},
                style: style,
            }
        );

        edges.push({
            id: `edge-${i}`,
            target: 'target',
            source: `${i}`,
            type: 'floating',
            markerEnd: {
                type: MarkerType.Arrow,
            },

        });
    }

    return { nodes, edges };
}

