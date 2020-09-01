
class TreeNode {
    constructor(value: number) {
        this.value = value;
        this.leftNode = null;
        this.rightNode = null;
    }

    value: number;
    leftNode: TreeNode | null;
    rightNode: TreeNode | null;
}

function insertNode(value: number, rootNode: TreeNode): void {
    if (value === rootNode.value) {
        return;
    }

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
}

function inOrderTraversal(node: TreeNode, traversedValues: number[]): number[] {
    if (node.leftNode !== null) {
        inOrderTraversal(node.leftNode, traversedValues);
    }

    traversedValues.push(node.value);

    if (node.rightNode !== null) {
        inOrderTraversal(node.rightNode, traversedValues);
    }

    return traversedValues;
}

function reverseOrderTraversal(node: TreeNode, traversedValues: number[]): number[] {
    if (node.rightNode !== null) {
        reverseOrderTraversal(node.rightNode, traversedValues);
    }

    traversedValues.push(node.value);

    if (node.leftNode !== null) {
        reverseOrderTraversal(node.leftNode, traversedValues);
    }

    return traversedValues;
}

function preOrderTraversal(node: TreeNode, traversedValues: number[]): number[] {
    traversedValues.push(node.value);

    if (node.leftNode !== null) {
        preOrderTraversal(node.leftNode, traversedValues);
    }

    if (node.rightNode !== null) {
        preOrderTraversal(node.rightNode, traversedValues);
    }

    return traversedValues;
}

function postOrderTraversal(node: TreeNode, traversedValues: number[]): number[] {
    if (node.leftNode !== null) {
        postOrderTraversal(node.leftNode, traversedValues);
    }

    if (node.rightNode !== null) {
        postOrderTraversal(node.rightNode, traversedValues);
    }

    traversedValues.push(node.value);

    return traversedValues;
}

export function runTests(): void {
    const inputs = [
        [100, 20, 10, 30, 200, 150, 300]
    ];

    inputs.forEach(input => {
        console.log(`original: ${input}`);
        const rootNode = new TreeNode(input.shift());
        input.forEach(value => insertNode(value, rootNode));

        const inOrder = inOrderTraversal(rootNode, []);
        console.log(`inOrder: ${inOrder}`);

        const reverseOrder = reverseOrderTraversal(rootNode, []);
        console.log(`reverseOrder: ${reverseOrder}`);

        const preOrder = preOrderTraversal(rootNode, []);
        console.log(`preOrder: ${preOrder}`);

        const postOrder = postOrderTraversal(rootNode, []);
        console.log(`postOrder: ${postOrder}`);
    });
}
