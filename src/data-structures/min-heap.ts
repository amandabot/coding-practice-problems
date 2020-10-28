export class MinHeap {
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
            this.swapValues(currentIndex, parentIndex);
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

        if (smallest !== index) {
            this.swapValues(index, smallest);
            this.sinkDownIndex(length, smallest);
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

        const sorted = minHeap.sort();
        console.log('sorted');
        console.log(sorted);

        console.log('delete all min heap values');
        while (minHeap.size > 0) {
            const randomIndex = Math.floor((minHeap.size - 1) * Math.random());
            console.log(`deleting ${minHeap.values[randomIndex]} at ${randomIndex}`);
            minHeap.deleteValue(minHeap.values[randomIndex]);
            console.log(minHeap.values);
        }
    });
}
