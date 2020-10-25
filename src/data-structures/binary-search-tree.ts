export class TreeNode {
    constructor(value: number) {
        this.value = value;
        this.leftNode = null;
        this.rightNode = null;
    }

    value: number;
    leftNode: TreeNode | null;
    rightNode: TreeNode | null;
}

export function insertNode(value: number, rootNode: TreeNode): void {
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
