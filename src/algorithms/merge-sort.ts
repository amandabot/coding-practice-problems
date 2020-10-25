function mergeSort(numbers: Array<number>, start: number, end: number): Array<number> {
    if (start < end) {
        const midpoint = start + Math.floor((end - start) / 2);

        mergeSort(numbers, start, midpoint);
        mergeSort(numbers, midpoint + 1, end);

        merge(numbers, start, midpoint, end);
    }

    return numbers;
}

function merge(numbers: Array<number>, start: number, midpoint: number, end: number): Array<number> {
    const left = numbers.slice(start, midpoint + 1);
    // we use end + 1 to get the last element of the right side. End represents the last index, and slice() excludes
    // the last number
    const right = numbers.slice(midpoint + 1, end + 1);
    let fillIndex = start;

    while (left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
            numbers[fillIndex] = left.shift();
            fillIndex++;
        }
        else {
            numbers[fillIndex] = right.shift();
            fillIndex++;
        }
    }

    while (left.length > 0) {
        numbers[fillIndex] = left.shift();
        fillIndex++;
    }

    while (right.length > 0) {
        numbers[fillIndex] = right.shift();
        fillIndex++;
    }

    return numbers;
}

export function runTests(): void {
    const inputs = [
        [1],
        [],
        [10, 10, 10],
        [10, 80, 30, 90, 40, 50, 70],
        [100, 20, 10, 30, 200, 150, 300]
    ];

    inputs.forEach(input => {
        console.log(`input: [${input}]`);
        const output = mergeSort(input, 0, input.length - 1);
        console.log(`output: [${output}]`);
    });
}
