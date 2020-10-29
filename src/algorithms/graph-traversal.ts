import { Graph, GraphNode, GraphType } from '../data-structures/graph';

function runBreadthFirst(): void {
    const graph = new Graph(GraphType.Undirected);

    const [first] = graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(1, 4);
    graph.addEdge(5, 2);
    graph.addEdge(6, 3);
    graph.addEdge(7, 3);
    graph.addEdge(8, 4);
    graph.addEdge(9, 5);
    graph.addEdge(10, 6);

    const iterator = bfs(first);
    let visitedNode = iterator.next().value;

    const visitedNodes = [];
    while (visitedNode) {
        visitedNodes.push(visitedNode.value);
        visitedNode = iterator.next().value;
    }
    console.log(`[BFS: ${visitedNodes.join(',')}]`);
}

function* bfs(first: GraphNode) {
    const visited = new Set<GraphNode>();
    const visitList = [];

    visitList.push(first);

    while (visitList.length > 0) {
        const node = visitList.shift();
        if (node && !visited.has(node)) {
            yield node;
            visited.add(node);
            node.getAdjacents().forEach((adj: GraphNode) => visitList.push(adj));
        }
    }
}

function runDepthFirst(): void {
    const graph = new Graph(GraphType.Undirected);

    const [first] = graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(1, 4);
    graph.addEdge(5, 2);
    graph.addEdge(6, 3);
    graph.addEdge(7, 3);
    graph.addEdge(8, 4);
    graph.addEdge(9, 5);
    graph.addEdge(10, 6);

    const iterator = dfs(first);
    let visitedNode = iterator.next().value;

    const visitedNodes = [];
    while (visitedNode) {
        visitedNodes.push(visitedNode.value);
        visitedNode = iterator.next().value;
    }
    console.log(`[DFS: ${visitedNodes.join(',')}]`);
}

function* dfs(first: GraphNode) {
    const visited = new Set<GraphNode>();
    const visitList = [];

    visitList.push(first);

    while (visitList.length > 0) {
        const node = visitList.pop();
        if (node && !visited.has(node)) {
            yield node;
            visited.add(node);
            node.getAdjacents().forEach((adj: GraphNode) => visitList.push(adj));
        }
    }
}

export function runTests(): void {
    runBreadthFirst();
    runDepthFirst();
}
