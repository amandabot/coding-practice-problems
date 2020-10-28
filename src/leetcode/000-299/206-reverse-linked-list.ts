import { ListNode } from '../../data-structures/linked-list';

function reverseListHead(head: ListNode | null, newHead: ListNode | null): ListNode | null {
    if (head === null) {
        return newHead;
    }

    const next = head.next;
    head.next = newHead;
    return reverseListHead(next, head)
}

function reverseListAlt(head: ListNode | null): ListNode | null {
    return reverseListHead(head, null);
}

function reverseList(head: ListNode | null): ListNode | null {
    if (head == null) {
        return null;
    }
    else if (head.next == null) {
        return head;
    }
    else {
        // for [1-2-3-4-5]
        // when head === 4, newHead === 5
        const newHead = reverseList(head.next);

        // before: 4->5->null
        // after: 4->5->4->5... (this creates a cycle)
        head.next.next = head;

        // 4->null, so newHead is now: 5->4->null. The cycle is removed
        head.next = null;

        // return 5->4->null
        // at the next level, the head is 3 and points to 4, so it will replace the null next of 4
        return newHead;
    }
}

function reverseListIterative(head: ListNode | null): ListNode | null {
    let newHead = null;
    let currentNode = head;
    while (currentNode !== null) {
        const nextNode = currentNode.next;
        currentNode.next = newHead;
        newHead = currentNode;
        currentNode = nextNode;
    }

    return newHead;
}

export function runTests(): void {
    const inputs = [
        [1, 2, 3, 4, 5],
        [1, 3, 4, 6, 8, 9, 12],
        [1, 2, 5, 7, 11, 21, 24],
        [-4, 0, 4, 7, 10, 14, 22, 29],
        [1, 4, 5],
        [1, 3, 4],
        [2, 6]
    ];

    inputs.forEach(values => {
        const head = new ListNode();
        let lastNode = head;
        values.forEach(value => {
            const newNode = new ListNode(value);
            lastNode.next = newNode;
            lastNode = newNode;
        });

        let output = reverseListIterative(head.next);
        let numbers = [];
        while (output !== null) {
            numbers.push(output.val);
            output = output.next;
        }
        console.log(`[${numbers.join(',')}]`);
    });
}
