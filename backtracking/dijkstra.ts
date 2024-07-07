class PriorityQueue {
    private elements: { node: string; priority: number }[] = [];

    enqueue(node: string, priority: number) {
        this.elements.push({ node, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue(): { node: string; priority: number } | undefined {
        return this.elements.shift();
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }
}

function dijkstra(graph: { [key: string]: { [key: string]: number } }, startNode: string) {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const pq = new PriorityQueue();

    for (const node in graph) {
        if (node === startNode) {
            distances[node] = 0;
            pq.enqueue(node, 0);
        } else {
            distances[node] = Infinity;
            pq.enqueue(node, Infinity);
        }
        previous[node] = null;
    }

    while (!pq.isEmpty()) {
        const smallest = pq.dequeue();
        if (!smallest) break;

        const currentNode = smallest.node;
        for (const neighbor in graph[currentNode]) {
            const distance = distances[currentNode] + graph[currentNode][neighbor];
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = currentNode;
                pq.enqueue(neighbor, distance);
            }
        }
    }

    return { distances, previous };
}

// Example usage:
const graph = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 }
};

const startNode = 'A';
const { distances, previous } = dijkstra(graph, startNode);

console.log("Distances:", distances);
console.log("Previous nodes:", previous);
