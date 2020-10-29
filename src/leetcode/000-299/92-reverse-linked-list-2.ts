import { ListNode } from '../../data-structures/linked-list';

function reverseBetween(head: ListNode | null, startIndex: number, endIndex: number): ListNode | null {
    if (head === null) {
        return null;
    }

    if (head.next === null) {
        return head;
    }

    // Get boundaries of head
    let firstNodeOfHead = null;
    let lastNodeOfHead = null;

    if (startIndex > 1) {
        firstNodeOfHead = head;
        lastNodeOfHead = head;
    }

    let currentNodeIndex = 1;
    while (startIndex - 1 > currentNodeIndex) {
        lastNodeOfHead = lastNodeOfHead.next;
        currentNodeIndex++;
    }

    // Get boundaries of middle
    let originalFirstNodeOfMiddle = head;
    if (lastNodeOfHead) {
        originalFirstNodeOfMiddle = lastNodeOfHead.next;
    }

    let newFirstNodeOfMiddle = null;
    let firstNodeOfTail = originalFirstNodeOfMiddle;
    let nodesInMiddle = endIndex - startIndex + 1;
    while (nodesInMiddle > 0) {
        const nextNode = firstNodeOfTail.next;
        if (firstNodeOfTail) {
            firstNodeOfTail.next = newFirstNodeOfMiddle;
        }
        newFirstNodeOfMiddle = firstNodeOfTail;
        firstNodeOfTail = nextNode;

        nodesInMiddle--;
    }

    if (originalFirstNodeOfMiddle) {
        originalFirstNodeOfMiddle.next = firstNodeOfTail;
    }

    if (lastNodeOfHead) {
        lastNodeOfHead.next = newFirstNodeOfMiddle;
    }

    return firstNodeOfHead ?? newFirstNodeOfMiddle;
}

function reverseBetweenBetter(head: ListNode | null, startIndex: number, endIndex: number): ListNode | null {
    if (!head || startIndex === endIndex) {
        return head;
    }

    const dummyNode = new ListNode();
    dummyNode.next = head;

    let headPointer = dummyNode;
    for (let index = 0; index < startIndex - 1; index++) {
        headPointer = headPointer.next;
    }

    let tailPointer = headPointer.next;
    for (let index = 0; index < endIndex - startIndex; index++) {
        const temp = headPointer.next;
        headPointer.next = tailPointer.next;
        tailPointer.next = tailPointer.next.next;
        headPointer.next.next = temp;
    }

    return dummyNode.next;
}

export function runTests(): void {
    const inputs = [
        [[1, 2, 3, 4, 5], 2, 4], // [1,4,3,2,5]
        [[1, 3, 4, 6, 8, 9, 12], 3, 6], // [1,3,9,8,6,4,12]
        [[1, 2, 5, 7, 11, 21, 24], 1, 7], // [24,21,11,7,5,2,1]
        [[-4, 0, 4, 7, 10, 14, 22, 29], 1, 2], // [0,-4,4,7,10,14,22,29]
        [[1, 4, 5], 1, 3], // [5,4,1]
        [[1, 3, 4], 1, 1], // [1,3,4]
        [[2, 6], 1, 2], // [6,2]
    ];

    inputs.forEach(grouping => {
        const head = new ListNode();
        let lastNode = head;
        const values = grouping[0] as number[];
        values.forEach(value => {
            const newNode = new ListNode(value);
            lastNode.next = newNode;
            lastNode = newNode;
        });

        let output = reverseBetweenBetter(head.next, grouping[1] as number, grouping[2] as number);
        let numbers = [];
        while (output !== null) {
            numbers.push(output.val);
            output = output.next;
        }
        console.log(`[${numbers.join(',')}]`);
    });
}
