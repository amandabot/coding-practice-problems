class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function mergeLists(node1: ListNode | null, node2: ListNode | null): ListNode | null {
    const rootNode = new ListNode();
    let currentNode: ListNode | null = rootNode;
    let listOneRoot: ListNode | null = node1;
    let listTwoRoot: ListNode | null = node2;

    while (listOneRoot !== null && listTwoRoot !== null) {
        if (listOneRoot.val < listTwoRoot.val) {
            currentNode.next = new ListNode(listOneRoot.val);
            currentNode = currentNode.next;
            listOneRoot = listOneRoot.next;
        }
        else {
            currentNode.next = new ListNode(listTwoRoot.val);
            currentNode = currentNode.next;
            listTwoRoot = listTwoRoot.next;
        }
    }

    if (listOneRoot !== null) {
        currentNode.next = listOneRoot;
    }

    if (listTwoRoot !== null) {
        currentNode.next = listTwoRoot;
    }

    // root node is a dummy node, so its next is the first real node
    return rootNode.next;
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    let mergedList: ListNode | null;
    let list1: ListNode | null;
    let list2: ListNode | null;

    while (lists.length > 1) {
        list1 = lists.shift() ?? null;
        list2 = lists.shift() ?? null;
        mergedList = mergeLists(list1, list2);
        lists.push(mergedList);
    }

    return lists[0] ?? null;
}

export function runTests(): void {
    const inputs = [
        [[1, 4, 5], [1, 3, 4], [2, 6]],
        [],
        [[]]
    ];

    inputs.forEach(input => {
        const nodes = input.map(list => {
            let lastCreatedNode = null;
            let currentNode = null;
            while (list.length > 0) {
                currentNode = new ListNode(list.pop(), lastCreatedNode);
                lastCreatedNode = currentNode;
            }
            return currentNode;
        })
        let output = mergeKLists(nodes);
        while (output !== null) {
            console.log(output.val);
            output = output.next;
        }
    });
}
