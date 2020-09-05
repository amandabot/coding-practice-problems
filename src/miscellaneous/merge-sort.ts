
function mergeSort(numbers: Array<number>): Array<number> {
    if (numbers.length === 1) {
        return numbers;
    }

    const midpoint = Math.floor(numbers.length / 2);

    const left = mergeSort(numbers.slice(0, midpoint));
    const right = mergeSort(numbers.slice(midpoint));

    return merge(left, right);
}

function merge(array1: Array<number>, array2: Array<number>): Array<number> {
    const sortedValues = [];

    while (array1.length > 0 || array2.length > 0) {
        if (array1[0] < array2[0] || array2.length === 0) {
            sortedValues.push(array1.shift());
        }
        else {
            sortedValues.push(array2.shift());
        }
    }

    return sortedValues;
}

export function runTests(): void {
    const inputs = [
        [10, 80, 30, 90, 40, 50, 70],
        [100, 20, 10, 30, 200, 150, 300]
    ];

    inputs.forEach(input => {
        console.log(`input: ${input}`);
        const output = mergeSort(input);
        console.log(`output: ${output}`);
    });
}
