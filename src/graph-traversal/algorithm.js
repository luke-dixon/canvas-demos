import {PriorityQueue, Queue, Stack} from './queues';

const traverseGraph = (QueueType, graph, startingPoint, outGraph) => {
    const visited = new Set();
    const queue = new QueueType();
    queue.add([
        startingPoint,
        null
    ]);
    while (queue.length) {
        const [
            node,
            parent
        ] = queue.remove();

        if (!visited.has(node.toString())) {
            if (parent) {
                outGraph.addEdge(parent, node);
            } else {
                outGraph.addNode(node);
            }
            visited.add(node.toString());
            for (const neighbour of graph.getNeighbours(node)) {
                if (!visited.has(neighbour.toString())) {
                    queue.add([
                        neighbour,
                        node
                    ]);
                }
            }
        }
    }
};

export const dfs = traverseGraph.bind(null, Stack);
export const bfs = traverseGraph.bind(null, Queue);
export const prims = traverseGraph.bind(null, PriorityQueue.bind(null, (node1, node2) => node1[0].distance(node1[1]) - node2[0].distance(node2[1])));
