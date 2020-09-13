class MaxHeap {
    values: number[];
    size = 0;

    constructor(values: number[]) {
        this.values = values ?? new Array<number>();
        this.size = this.values.length;
    }

    heapify(length: number, previousRoot: number): number[] {
        let largest = previousRoot;
        const left = (2 * previousRoot) + 1;
        const right = (2 * previousRoot) + 2;

        if (left < length && this.values[left] > this.values[largest]) {
            largest = left;
        }

        if (right < length && this.values[right] > this.values[largest]) {
            largest = right;
        }

        if (largest != previousRoot) {
            swapValues(this.values, previousRoot, largest);
            this.heapify(length, largest);
        }

        return this.values;
    }

    insert(value: number): void {
        this.values[this.size] = value;
        this.size += 1;
        this.heapify(this.size, this.size - 1);
    }

    deleteValue(value: number): void {
        const index = this.values.indexOf(value);
        if (index !== -1) {
            this.values[index] = this.values[this.size - 1];
            this.values.pop();
            this.size -= 1;
            this.heapify(this.size, index);
        }
    }

    sort(): number[] {
        for (let index = this.size - 1; index >= 0; index -= 1) {
            swapValues(this.values, 0, index);
            this.heapify(index, 0);
        }

        return this.values;
    }
}

class MinHeap {
    values: number[];
    size = 0;

    constructor() {
        this.values = new Array<number>();
    }

    insertValue(value: number): void {
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

    bubbleUpIndex(index: number): void {
        let currentIndex = index;
        let parentIndex = Math.floor(currentIndex / 2);

        while (currentIndex > 0 && this.values[parentIndex] > this.values[currentIndex]) {
            swapValues(this.values, currentIndex, parentIndex);
            currentIndex = parentIndex;
            parentIndex = Math.floor(parentIndex / 2);
        }
    }

    sinkDownIndex(length: number, index: number): void {
        let smallest = index;
        let left = 2 * index;
        let right = (2 * index) + 1;

        if (left < length && this.values[smallest] > this.values[left]) {
            smallest = left;
        }

        if (right < length && this.values[smallest] > this.values[right]) {
            smallest = right;
        }

        if (smallest != index) {
            swapValues(this.values, index, smallest);
            this.sinkDownIndex(length, smallest);
        }
    }

    sort(): number[] {
        for (let index = this.size - 1; index >= 0; index -= 1) {
            swapValues(this.values, 0, index);
            this.sinkDownIndex(index, 0);
        }

        return this.values;
    }
}

function swapValues(array: number[], index1: number, index2: number): number[] {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;

    return array;
}

export function runTests(): void {
    const inputs = [
        [1, 3, 5, 8, 34, 24, 100, 12, 15],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [4, 3, 2, 1, 9, 8, 7, 6, 5]
    ];

    inputs.forEach(input => {
        console.log('original');
        console.log(input);

        const minHeap = new MinHeap();
        for (let index = 0; index < input.length; index += 1) {
            minHeap.insertValue(input[index]);
        }
        console.log('As min heap');
        console.log(minHeap.values);

        let sorted = minHeap.sort();
        console.log('sorted');
        console.log(sorted);

        let randomIndex = Math.floor((minHeap.size - 1) * Math.random());
        console.log(`delete value ${minHeap.values[randomIndex]} at ${randomIndex}`);
        minHeap.deleteValue(minHeap.values[randomIndex]);
        console.log(minHeap.values);

        console.log('delete all min heap values');
        while (minHeap.size > 0) {
            randomIndex = Math.floor((minHeap.size - 1) * Math.random());
            console.log(`deleting ${minHeap.values[randomIndex]} at ${randomIndex}`);
            minHeap.deleteValue(minHeap.values[randomIndex]);
            console.log(minHeap.values);
        }

        const maxHeap = new MaxHeap(input.slice());
        for (let index = (maxHeap.size / 2) - 1; index >= 0; index -= 1) {
            maxHeap.heapify(maxHeap.size, Math.floor(index));
        }
        console.log('As max heap');
        console.log(maxHeap.values);

        sorted = maxHeap.sort();
        console.log('sorted');
        console.log(sorted);

        randomIndex = Math.floor((minHeap.size - 1) * Math.random());
        console.log(`delete value ${maxHeap.values[randomIndex]} at ${randomIndex}`);
        maxHeap.deleteValue(maxHeap.values[randomIndex]);
        console.log(maxHeap.values);

        console.log('delete all max heap values');
        while (maxHeap.size > 0) {
            randomIndex = Math.floor((maxHeap.size - 1) * Math.random());
            console.log(`deleting ${maxHeap.values[randomIndex]} at ${randomIndex}`);
            maxHeap.deleteValue(maxHeap.values[randomIndex]);
            console.log(maxHeap.values);
        }
    });
}
