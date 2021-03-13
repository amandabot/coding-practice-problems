let prefixSums: number[];
let numberOfWindows = 3;
let bestIndices = [];
let currentIteration = [];

// function maxSumOfThreeSubarrays(numbers: number[], k: number): number[] {
function maxSumOfThreeSubarrays(numbers: number[], k: number): number {
    prefixSums = [];
    for (let index = 0; index < numbers.length; index++) {
        const sum = getSum(numbers, index, k);
        prefixSums[index] = sum;
    }

    return findMaxSum(k - 1, k, numberOfWindows);
}

function findMaxSum(endIndex: number, windowSize: number, remainingWindows: number): number {
    let maxSum = 0;

    const requiredWindowSpace = windowSize * (remainingWindows - 1);

    if (remainingWindows === 0) {
        return maxSum;
    }

    for (let index = endIndex; index < prefixSums.length - requiredWindowSpace; index++) {
        const sumOfSubWindows = findMaxSum(index + windowSize, windowSize, remainingWindows - 1);
        const sumOfThisWindow = prefixSums[index] + sumOfSubWindows;
        maxSum = Math.max(maxSum, sumOfThisWindow);
    }

    return maxSum;
}

function getSum(numbers: number[], endIndex: number, windowSize: number): number {
    const previousHeadIndex = endIndex - windowSize;
    const previousHeadValue = numbers[previousHeadIndex] ?? 0;
    const nextTailValue = numbers[endIndex];
    const previousSum = prefixSums[endIndex - 1] ?? 0;

    return previousSum - previousHeadValue + nextTailValue;
}

export function runTests(): void {
    const inputs = [
        [[0, 1, 2, 3, 4, 5, 6, 7], 2], // [0, 3, 5] / 23
        [[1, 2, 1, 2, 6, 7, 5, 1], 2], // [0, 3, 5] / 23
        // [[1, 2, 3, 4, 5, 6, 7, 8], 2], // [2, 4, 6] / 33
        // [[1, 8, 7, 1, 1, 6, 7, 1, 1, 9, 10], 2], // [1, 5, 9] / 47
        // [[5, 5, 5, 5, 5, 5], 2], // [0,2,4] / 30
        // [[1, 2, 3, 4, 5, 4, 1, 2, 3], 2], // [2,4,7] / 21
    ];

    inputs.forEach(input => {
        const output = maxSumOfThreeSubarrays(input[0] as number[], input[1] as number);
        console.log(`${output}`);
        // console.log(`[${bestIndices.join(',')}]`);
    });
}
