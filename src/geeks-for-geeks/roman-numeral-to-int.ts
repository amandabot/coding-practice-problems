// Time O(n) iterate over each character of the string
// Space O(1) constant use of variables regardless of input
function romanNumeralToInt(input: string): number {
    // we will assume the input is non-null and a valid Roman numeral (uppercase, properly formatted, [1,3999])
    let runningTotal = 0;
    const conversionTable = new Map<string, number>([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000]
    ]);

    let sumOfSubset = 0;
    let previousValue = null;
    for (let index = 0; index < input.length; index++) {
        const currentValue = conversionTable.get(input[index]);

        if (previousValue === null) {
            sumOfSubset += currentValue;
            previousValue = currentValue;
            continue;
        }

        if (previousValue > currentValue) {
            // we have reached a new subset
            runningTotal += sumOfSubset;
            sumOfSubset = currentValue;
            previousValue = currentValue;
        }
        else if (previousValue < currentValue) {
            // the previous value is a subtractive term
            runningTotal += currentValue - previousValue;
            sumOfSubset = 0;
            previousValue = null;
        }
        else {
            sumOfSubset += currentValue;
            previousValue = currentValue;
        }
    }
    runningTotal += sumOfSubset;

    return runningTotal;
}

export function runTests(): void {
    const inputs = [
        'MCMXII', // 1912
        'MM', // 2000,
        'I', // 1
        'II', // 2
        'III', // 3
        'IV', // 4
        'V', // 5
        'VI', // 6
        'VII', // 7
        'VIII', // 8
        'IX', // 9
        'X', // 10
        'XX', // 20
        'XL', // 40
        'L', // 50
        'LX', // 60
        'XC', // 90
        'C', // 100
        'CX', // 110
        'CD', // 400
        'D', // 500
        'CM', // 900
        'M', // 1000
        'MMMCMXCIX', // 3999
        'MDCCCCX', // 1910
        'CDXCIX', // 499
        'MCXI', // 1111
    ];

    inputs.forEach(input => {
        const output = romanNumeralToInt(input);
        console.log(`output: ${output}`);
    });
}
