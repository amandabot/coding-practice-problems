export class MaxHeap {
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

        if (largest !== index) {
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

export function runTests(): void {
    const inputs = [
        [1, 3, 5, 8, 34, 24, 100, 12, 15],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [4, 3, 2, 1, 9, 8, 7, 6, 5]
    ];

    inputs.forEach(input => {
        console.log('original');
        console.log(input);

        const maxHeap = new MaxHeap();
        for (let index = 0; index < input.length; index += 1) {
            maxHeap.insert(input[index]);
        }
        console.log('As max heap');
        console.log(maxHeap.values);

        const sorted = maxHeap.sort();
        console.log('sorted');
        console.log(sorted);

        console.log('delete all max heap values');
        while (maxHeap.size > 0) {
            const randomIndex = Math.floor((maxHeap.size - 1) * Math.random());
            console.log(`deleting ${maxHeap.values[randomIndex]} at ${randomIndex}`);
            maxHeap.deleteValue(maxHeap.values[randomIndex]);
            console.log(maxHeap.values);
        }
    });
}
