export class GraphNode {
    value: number;
    adjacents: Array<GraphNode>;

    constructor(value: number) {
        this.value = value;
        this.adjacents = []; // adjacency list
    }

    addAdjacent(node: GraphNode) {
        this.adjacents.push(node);
    }

    removeAdjacent(node: GraphNode) {
        const index = this.adjacents.indexOf(node);
        if (index > -1) {
            this.adjacents.splice(index, 1);
            return node;
        }
    }

    getAdjacents() {
        return this.adjacents;
    }

    isAdjacent(node: GraphNode) {
        return this.adjacents.indexOf(node) > -1;
    }
}

export enum GraphType {
    Directed,
    Undirected
}

export class Graph {
    edgeDirection: GraphType;
    nodes: Map<number, GraphNode>;

    constructor(edgeDirection = GraphType.Directed) {
        this.nodes = new Map();
        this.edgeDirection = edgeDirection;
    }

    addEdge(source: number, destination: number) {
        const sourceNode = this.addVertex(source);
        const destinationNode = this.addVertex(destination);

        sourceNode.addAdjacent(destinationNode);

        if (this.edgeDirection === GraphType.Undirected) {
            destinationNode.addAdjacent(sourceNode);
        }

        return [sourceNode, destinationNode];
    }

    removeEdge(source: number, destination: number) {
        const sourceNode = this.nodes.get(source);
        const destinationNode = this.nodes.get(destination);

        if (sourceNode && destinationNode) {
            sourceNode.removeAdjacent(destinationNode);

            if (this.edgeDirection === GraphType.Undirected) {
                destinationNode.removeAdjacent(sourceNode);
            }
        }

        return [sourceNode, destinationNode];
    }

    addVertex(value: number) {
        if (this.nodes.has(value)) {
            return this.nodes.get(value);
        }
        else {
            const vertex = new GraphNode(value);
            this.nodes.set(value, vertex);
            return vertex;
        }
    }

    removeVertex(value: number) {
        const current = this.nodes.get(value);
        if (current) {
            for (const node of this.nodes.values()) {
                node.removeAdjacent(current);
            }
        }
        return this.nodes.delete(value);
    }
}
