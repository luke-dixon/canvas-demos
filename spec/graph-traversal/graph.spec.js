/* eslint-env jasmine */
import {Point, UndirectedGraph} from '../../src/graph-traversal/undirectedGraph';

describe('An Undirected Graph object', () => {
    const graph = new UndirectedGraph();
    graph.addEdge(new Point(2, 5), new Point(1, 3), 5);
    graph.addEdge(new Point(12, 23), new Point(8, 13));

    it('remembers what nodes it has.', () => {
        expect(graph.hasNode(new Point(2, 5))).toBeTruthy();
        expect(graph.hasNode(new Point(1, 3))).toBeTruthy();
        expect(graph.hasNode(new Point(4, 9))).toBeFalsy();
    });

    it('has edges going both directions since this type of graph is undirected.', () => {
        // The graph is undirected so we expect each edge to exist both ways
        expect(graph.hasEdge(new Point(2, 5), new Point(1, 3))).toBeTruthy();
        expect(graph.hasEdge(new Point(1, 3), new Point(2, 5))).toBeTruthy();
    });

    it('uses distance as a weight multiplied by a given weight or just the distance.', () => {
        expect(graph.getWeight(new Point(2, 5), new Point(1, 3))).toBe(5 * Math.sqrt(1 + 4));
        expect(graph.getWeight(new Point(12, 23), new Point(8, 13))).toBe(Math.sqrt(16 + 100));
    });

    it('allows retrieval of its nodes.', () => {
        expect(graph.getNodes()).toContain(new Point(2, 5));
        expect(graph.getNodes()).toContain(new Point(1, 3));
        expect(graph.getNodes()).not.toContain(new Point(9, 3));
    });

    it('allows retrieval of its edges.', () => {
        expect(graph.getEdges()).toContain([
            // node 1
            new Point(2, 5),
            // node 2
            new Point(1, 3),
            // weight
            5 * Math.sqrt(1 + 4)
        ]);
        expect(graph.getEdges()).toContain([
            new Point(12, 23),
            new Point(8, 13),
            Math.sqrt(16 + 100)
        ]);
    });

    it('allows retrieval of neighbours of a node.', () => {
        expect(graph.getNeighbours(new Point(2, 5))).toContain(new Point(1, 3));
        expect(graph.getNeighbours(new Point(2, 5))).not.toContain(new Point(12, 23));
    });

    it('allows us to check if a node has another node as a neighbour.', () => {
        expect(graph.isNeighbour(new Point(2, 5), new Point(1, 3))).toBeTruthy();
        expect(graph.isNeighbour(new Point(2, 5), new Point(12, 23))).toBeFalsy();
    });
});
