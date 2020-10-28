import { insertNode, TreeNode } from '@app/data-structures/binary-search-tree';

// sorted order of nodes asc
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

// sorted order of nodes desc
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

// Order the nodes were inserted; Can make a copy of the tree this way
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

// tree deletion without leaking memory
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

function levelTraversal(node: TreeNode): number[] {
    const traversedValues = [];

    const queue = new Array<TreeNode>();
    queue.push(node);

    while (queue.length > 0) {
        const currentNode = queue.shift();
        traversedValues.push(currentNode.value);

        if (currentNode.leftNode !== null) {
            queue.push(currentNode.leftNode);
        }

        if (currentNode.rightNode !== null) {
            queue.push(currentNode.rightNode);
        }
    }

    return traversedValues;
}

export function runTests(): void {
    const inputs = [
        [100, 20, 10, 30, 200, 150, 300],
        [1, 2, 3, 4]
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

        const levelOrder = levelTraversal(rootNode);
        console.log(`levelOrder: ${levelOrder}`);
    });
}
