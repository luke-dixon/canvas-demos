import {Point, UndirectedGraph} from './undirectedGraph';
import {bfs, dfs, prims} from './algorithm';
import {styles} from './style.css'; // eslint-disable-line no-unused-vars

const canvas = document.getElementById('myCanvas');

window.onload = function () {
    const currentAnimationText = document.getElementById('currentAnimationText');
    const displayNodeLabels = true;
    const startingPoint = new Point(270, 151);

    const randomGraph = () => {
        const numNodes = 20;
        const minDistance = 30;

        const graph = new UndirectedGraph();

        graph.addNode(startingPoint);
        while (graph.getNodes().length < numNodes) {
            let tooClose = false;
            let point = null;
            do {
                tooClose = false;
                point = new Point(
                    Math.floor(Math.random() * (canvas.width - 20)) + 10,
                    Math.floor(Math.random() * (canvas.height - 20)) + 10
                );

                for (const node of graph.getNodes()) {
                    if (node.distance(point) < minDistance) {
                        tooClose = true;
                    }
                }
            } while (tooClose);

            graph.addNode(point);
        }

        // Connect each to its nearest and second nearest unconnected neighbours
        for (const node1 of graph.getNodes()) {
            let shortestDistance = Infinity;
            let shortestDistanceNode = null;
            let secondShortestDistanceNode = null;
            for (const node2 of graph.getNodes()) {
                if (node1.toString() !== node2.toString() && !graph.isNeighbour(node1, node2)) {
                    const distance = node1.distance(node2);
                    if (distance < shortestDistance) {
                        secondShortestDistanceNode = shortestDistanceNode;
                        shortestDistance = distance;
                        shortestDistanceNode = node2;
                    }
                }
            }
            if (shortestDistanceNode) {
                graph.addEdge(node1, shortestDistanceNode);
            }
            if (secondShortestDistanceNode) {
                graph.addEdge(node1, secondShortestDistanceNode);
            }
        }

        return graph;
    };
    let outputGraph = new UndirectedGraph();
    const graph = randomGraph();

    const drawNode = function (ctx, timestamp, node, color = 'green') {
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = 10;
        ctx.moveTo(node.xPos, node.yPos);
        ctx.lineTo(node.xPos, node.yPos);
        ctx.stroke();

        if (displayNodeLabels) {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.textAlign = 'center';
            ctx.font = '10px sans-serif';
            ctx.fillText(node, node.xPos, node.yPos - 10);
            ctx.stroke();
        }
    };

    const drawEdge = function (ctx, timestamp, edge, color = 'grey') {
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.moveTo(edge[0].xPos, edge[0].yPos);
        ctx.lineTo(edge[1].xPos, edge[1].yPos);
        ctx.stroke();
    };

    /**
     * Draws the scene.
     */
    const drawScene = (callback, timeStamp) => {
        const ctx = canvas.getContext('2d');

        // Clear the scene
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Loop through each edge and draw it.
        for (const edge of graph.getEdges()) {
            drawEdge(ctx, timeStamp, edge);
        }

        // Loop through each node and draw it.
        for (const node of graph.getNodes()) {
            drawNode(ctx, timeStamp, node);
        }

        // Loop through each edge and draw it.
        for (const edge of outputGraph.getEdges()) {
            drawEdge(ctx, timeStamp, edge, 'red');
        }

        // Loop through each node and draw it.
        for (const node of outputGraph.getNodes()) {
            drawNode(ctx, timeStamp, node, 'blue');
        }

        if (callback instanceof Function) {
            callback(timeStamp); // eslint-disable-line callback-return
        }
    };

    window.requestAnimationFrame(drawScene.bind(null, null));

    const bfsButton = document.getElementById('bfsButton');
    bfsButton.addEventListener('click', function () {
        outputGraph = new UndirectedGraph();
        window.requestAnimationFrame(drawScene.bind(null, () => {
            bfs(graph, startingPoint, outputGraph);
            let distance = 0;
            for (const edge of outputGraph.getEdges()) {
                distance += edge[2];
            }
            setTimeout(() => {
                window.requestAnimationFrame(drawScene.bind(null, null));
                currentAnimationText.replaceChild(document.createTextNode(`Breadth first search length: ${distance.toFixed(3)} (to 3 d.p.)`), currentAnimationText.lastChild);
            }, 500);
        }));
    });
    const dfsButton = document.getElementById('dfsButton');
    dfsButton.addEventListener('click', function () {
        outputGraph = new UndirectedGraph();
        window.requestAnimationFrame(drawScene.bind(null, () => {
            dfs(graph, startingPoint, outputGraph);
            let distance = 0;
            for (const edge of outputGraph.getEdges()) {
                distance += edge[2];
            }
            setTimeout(() => {
                window.requestAnimationFrame(drawScene.bind(null, null));
                currentAnimationText.replaceChild(document.createTextNode(`Depth first search length: ${distance.toFixed(3)} (to 3 d.p.)`), currentAnimationText.lastChild);
            }, 500);
        }));
    });
    const primsButton = document.getElementById('primsButton');
    primsButton.addEventListener('click', function () {
        outputGraph = new UndirectedGraph();
        window.requestAnimationFrame(drawScene.bind(null, () => {
            prims(graph, startingPoint, outputGraph);
            let distance = 0;
            for (const edge of outputGraph.getEdges()) {
                distance += edge[2];
            }
            setTimeout(() => {
                window.requestAnimationFrame(drawScene.bind(null, null));
                currentAnimationText.replaceChild(document.createTextNode(`Prim's algorithm length: ${distance.toFixed(3)} (to 3 d.p.)`), currentAnimationText.lastChild);
            }, 500);
        }));
    });

    currentAnimationText.appendChild(document.createTextNode(`Starting point: ${startingPoint}\t`));
    currentAnimationText.appendChild(document.createTextNode('Choose:'), currentAnimationText.lastChild);
};
