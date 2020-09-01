class TreeNode {
    constructor(value: number) {
        this.value = value;
        this.count = 1;
        this.leftNode = null;
        this.rightNode = null;
    }

    value: number;
    count: number;
    leftNode: TreeNode | null;
    rightNode: TreeNode | null;

    incrementCount(): void {
        this.count += 1;
    }
}

function countLesserNodeValues(value: number, node: TreeNode): number {
    let leftCount = 0;
    let rightCount = 0;
    let nodeCount = 0;

    if (node.leftNode !== null) {
        leftCount = countLesserNodeValues(value, node.leftNode);
    }

    if (node.value < value) {
        nodeCount = node.count;
        console.log(`visited: ${node.value}`);

        if (node.rightNode !== null) {
            rightCount += countLesserNodeValues(value, node.rightNode);
        }
    }

    return leftCount + rightCount + nodeCount;
}

function insertNode(value: number, rootNode: TreeNode): void {
    if (rootNode.value < value) {
        if (rootNode.rightNode === null) {
            rootNode.rightNode = new TreeNode(value);
        }
        else {
            insertNode(value, rootNode.rightNode);
        }
    }
    else if (rootNode.value > value) {
        if (rootNode.leftNode === null) {
            rootNode.leftNode = new TreeNode(value);
        }
        else {
            insertNode(value, rootNode.leftNode);
        }
    }
    else {
        rootNode.incrementCount();
    }
}

function countSmaller(nums: number[]): number[] {
    const counts = [];
    counts[nums.length - 1] = 0;
    const valueTree = new TreeNode(nums.pop());

    for (let i = nums.length - 1; i >= 0; i--) {
        const value = nums[i];
        const count = countLesserNodeValues(value, valueTree);
        counts[i] = count;
        insertNode(value, valueTree);
    }

    return counts;
}

export function runTests(): void {
    const inputs = [
        [5, 2, 6, 1],
        [300, 150, 200, 30, 10, 20, 100]
    ];

    inputs.forEach(input => {
        const output = countSmaller(input);
        console.log(output);
    });
}
