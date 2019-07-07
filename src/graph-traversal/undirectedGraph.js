export class Point {
    constructor(xPos, yPos, label = '') {
        this.xPos = xPos;
        this.yPos = yPos;
        this.label = label;
    }

    toString() {
        return `${this.label}(${this.xPos}, ${this.yPos})`;
    }

    distance(otherPoint) {
        return Math.sqrt(Math.pow(this.yPos - otherPoint.yPos, 2) + Math.pow(this.xPos - otherPoint.xPos, 2));
    }
}

export class UndirectedGraph {
    constructor() {
        this.adjacencyList = {};
        this.nodes = {};
        this.edges = {};
    }

    addNode(node) {
        this.adjacencyList[node] = {};
        this.nodes[node] = node;
    }

    addEdge(node1, node2, weight = 1) {
        if (!this.adjacencyList[node1]) {
            this.addNode(node1);
        }
        if (!this.adjacencyList[node2]) {
            this.addNode(node2);
        }
        this.adjacencyList[node1][node2] = weight * node1.distance(node2);
        this.adjacencyList[node2][node1] = weight * node2.distance(node1);

        this.edges[`${node1} -> ${node2}`] = [
            node1,
            node2,
            weight * node1.distance(node2)
        ];
        this.edges[`${node2} -> ${node1}`] = [
            node2,
            node1,
            weight * node2.distance(node1)
        ];
    }

    hasNode(node) {
        return this.adjacencyList[node];
    }

    hasEdge(node1, node2) {
        if (this.adjacencyList[node1]) {
            return this.adjacencyList[node1][node2];
        }
        return false;
    }

    getWeight(node1, node2) {
        if (this.adjacencyList[node1]) {
            return this.adjacencyList[node1][node2];
        }
        return null;
    }

    getNodes() {
        const nodes = [];
        for (const node of Object.keys(this.nodes)) {
            nodes.push(this.nodes[node]);
        }
        return nodes;
    }

    getEdges() {
        const edges = [];
        for (const edge of Object.keys(this.edges)) {
            edges.push(this.edges[edge]);
        }
        return edges;
    }

    getNeighbours(node) {
        const nodes = [];
        for (const edgeKey of Object.keys(this.edges)) {
            const edge = this.edges[edgeKey];
            if (edge[0].toString() === node.toString()) {
                nodes.push(edge[1]);
            }
        }
        return nodes;
    }

    isNeighbour(node1, node2) {
        for (const neighbour of this.getNeighbours(node1)) {
            if (node2.toString() === neighbour.toString()) {
                return true;
            }
        }
        return false;
    }
}
