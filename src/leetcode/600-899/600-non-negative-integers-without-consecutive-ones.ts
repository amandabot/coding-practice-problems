
let memo = [];
let operations = 0;

// Time O(log(n)) - for every power of 2, it can take 2-3 operations to get to 2 ^ n-1. This is O(3log(n))
// Space O(log(n)) - same as above - the memo could use up to 3log(n) slots of space if we store the result of each op
function findIntegers(num: number): number {
    memo = [];
    operations = 0;

    return countMatches(num);
}

function countMatches(num: number): number {
    if (num === 0) {
        operations++;
        return 1;
    }

    if (num === 1) {
        operations++;
        return 2;
    }

    if (num === 2 || num === 3) {
        operations++;
        return 3;
    }

    if (memo[num]) {
        operations++;
        return memo[num];
    }

    const asBinaryString = num.toString(2);
    const exponentOfLowerPowerOfTwo = Math.floor(Math.log2(num));
    const lowerPowerOfTwo = Math.pow(2, exponentOfLowerPowerOfTwo);
    const startsWithDoubleOnes = asBinaryString.startsWith('11');

    let result = 0;
    if (startsWithDoubleOnes) {
        result = countMatches((1.5 * lowerPowerOfTwo) - 1);
    }
    else {
        // result = countMatches(num - lowerPowerOfTwo) + countMatches(lowerPowerOfTwo - 1);
        result = countMatches(num - lowerPowerOfTwo) + countMatches((1.5 * (lowerPowerOfTwo / 2)) - 1);
    }
    operations++;

    memo[num] = result;

    return result;
}

export function runTests(): void {
    const inputs = [
        1, // 2 {0,1}
        2, // 3 {0,1,10}
        3, // 3 {0,1,10}
        4, // 4 {0,1,10,100}
        5, // 5 {0,1,10,101}
        6, // 5 {0,1,10,101}
        7, // 5
        8, // 6
        9, // 7
        10, // 8
        11, // 8
        12, // 8
        19, // 11
        25, // 13
        32, // 14
        50, // 21
        64, // 22
        100,
        1000,
        10000,
        100000,
        1000000,
        10000000,
        100000000,
    ];

    inputs.forEach(input => {
        const output = findIntegers(input);
        console.log(`${input}: ${output}, operations: ${operations}, digits: ${input.toString(2).length}`);
    });

    // printExamples();
}

function printExamples(): void {
    let count = 0;
    Array(65).fill(0).forEach((v, k) => {
        const asBinaryString = k.toString(2);
        const containsConsectiveOnes = asBinaryString.includes('11');
        count += containsConsectiveOnes ? 0 : 1;
        console.log(`${k}: ${asBinaryString}: ${containsConsectiveOnes ? 1 : 0} - ${count}`);
    });
}
