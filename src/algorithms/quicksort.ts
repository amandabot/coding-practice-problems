function quicksort(numbers: Array<number>, min: number, max: number): Array<number> {
    if(min < max){
        const partitionIndex = partition(numbers, min, max);

        quicksort(numbers, min, partitionIndex - 1);
        quicksort(numbers, partitionIndex + 1, max);
    }

    return numbers;
}

function partition(numbers: Array<number>, min: number, max: number): number {
    const pivot = numbers[max];
    let headIndex = min - 1;

    for(let tailIndex = min; tailIndex <= max; tailIndex += 1){
        if(numbers[tailIndex] < pivot){
            headIndex += 1;
            swapValuesAt(numbers, headIndex, tailIndex);
        }
    }
    swapValuesAt(numbers, headIndex + 1, max);
    return headIndex + 1;
}

function swapValuesAt(numbers: Array<number>, a: number, b: number): void {
    const temp = numbers[a];
    numbers[a] = numbers[b];
    numbers[b] = temp;
}

export function runTests(): void {
    const inputs = [
        [10, 80, 30, 90, 40, 50, 70],
        [100, 20, 10, 30, 200, 150, 300]
    ];

    inputs.forEach(input => {
        console.log(`input: ${input}`);
        const output = quicksort(input, 0, input.length - 1);
        console.log(`output: ${output}`);
    });
}
