class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

class MaxHeap {
    values: number[];
    size = 0;

    constructor(values?: number[]) {
        this.values = values ?? new Array<number>();
        this.size = this.values.length;
    }

    sinkDownIndex(length: number, index: number): number[] {
        let largest = index;
        const left = (2 * index) + 1;
        const right = (2 * index) + 2;

        if (left < length && this.values[left] > this.values[largest]) {
            largest = left;
        }

        if (right < length && this.values[right] > this.values[largest]) {
            largest = right;
        }

        if (largest != index) {
            this.swapValues(index, largest);
            this.sinkDownIndex(length, largest);
        }

        return this.values;
    }

    bubbleUpIndex(index: number): void {
        let currentIndex = index;
        let parentIndex = Math.floor((currentIndex - 1) / 2);

        while (currentIndex > 0 && this.values[parentIndex] < this.values[currentIndex]) {
            this.swapValues(currentIndex, parentIndex);
            currentIndex = parentIndex;
            parentIndex = Math.floor((parentIndex - 1) / 2);
        }
    }

    insert(value: number): void {
        this.values.push(value);
        this.size += 1;
        this.bubbleUpIndex(this.size - 1);
    }

    deleteValue(value: number): void {
        const index = this.values.indexOf(value);
        if (index !== -1) {
            this.values[index] = this.values[this.size - 1];
            this.values.pop();
            this.size -= 1;
            this.sinkDownIndex(this.size, index);
        }
    }

    sort(): number[] {
        for (let index = this.size - 1; index >= 0; index -= 1) {
            this.swapValues(0, index);
            this.sinkDownIndex(index, 0);
        }

        return this.values;
    }

    swapValues(index1: number, index2: number): number[] {
        const temp = this.values[index1];
        this.values[index1] = this.values[index2];
        this.values[index2] = temp;

        return this.values;
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

function mergeKListsTwo(lists: Array<ListNode | null>): ListNode | null {
    const maxHeap = new MaxHeap([]);

    lists.forEach(list => {
        let currentNode = list;
        while (currentNode !== null) {
            maxHeap.insert(currentNode.val);
            currentNode = currentNode.next;
        }
    });

    maxHeap.sort();

    const initialNode = new ListNode();
    let currentNode = initialNode;
    maxHeap.values.forEach(value => {
        currentNode.next = new ListNode(value);
        currentNode = currentNode.next;
    });

    return initialNode.next ?? null;
}

export function runTests(): void {
    const inputs = [
        [[1, 3, 4, 6, 8, 9, 12], [1, 2, 5, 7, 11, 21, 24], [-4, 0, 4, 7, 10, 14, 22, 29]],
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
        // let output = mergeKLists(nodes);
        let output = mergeKListsTwo(nodes);
        while (output !== null) {
            console.log(output.val);
            output = output.next;
        }
    });
}
