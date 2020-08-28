let currentMaxValue: number;
let nodeCount: number;
let allPrimes: number[];
let discoveredPrimes: Set<number>;
let nextMaxValue: number;
let maxDiscoveredValue = 0;

class TreeNode {
    constructor(value: number) {
        this.value = value;
        this.childNodes = new Array<TreeNode>();
    }
    value: number;
    childNodes: Array<TreeNode>;
}

function buildNextIteration(node: TreeNode, branchIndex: number): void {
    for (let i = branchIndex; i < allPrimes.length; i++) {
        // If a node doesn't have a value, we need to calculate it;
        // otherwise we proceed to its children
        if (!node.childNodes[i]) {
            const nextValue = node.value * allPrimes[i];
            if (nextValue > currentMaxValue) {
                nextMaxValue = nextMaxValue || nextValue;
                break;
            }
            const newNode = new TreeNode(nextValue);
            node.childNodes[i] = newNode;
            nodeCount += 1;
            discoveredPrimes.add(nextValue);
            maxDiscoveredValue = Math.max(maxDiscoveredValue, nextValue);
            console.log('discovered ' + nextValue);
        }
        buildNextIteration(node.childNodes[i], i);
    }
}

export function nthSuperUglyNumber(n: number, primes: number[]): number {
    if (n === 1) {
        return 1;
    }

    discoveredPrimes = new Set([1, ...primes]);
    allPrimes = primes;
    nodeCount = primes.length + 1;
    currentMaxValue = primes[0];

    const rootTree = new TreeNode(1);
    rootTree.childNodes = primes.map(prime => new TreeNode(prime));

    // If the final prime is much larger than the others, its presence in the list
    // will throw off the final node count
    while (nodeCount < n || maxDiscoveredValue < primes[primes.length - 1]) {
        nextMaxValue = 0;
        buildNextIteration(rootTree, 0);
        currentMaxValue = nextMaxValue;
    }

    const sortedPrimes = Array.from(discoveredPrimes.keys()).sort((a, b) => a - b);
    return sortedPrimes[n - 1];
}
