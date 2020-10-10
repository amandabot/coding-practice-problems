// Time O(n) iterate over each character of the string
// Space O(1) constant use of variables regardless of input
// We will assume the input is non-null and a valid Roman numeral (uppercase, properly formatted, [1,3999])
function romanNumeralToInt(input: string): number {
    let runningTotal = 0;
    const conversionTable = new Map<string, number>([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000],
        ['N', 5000],
        ['H', 10000],
        ['P', 50000],
        ['G', 100000],
        ['F', 500000],
        ['S', 1000000],
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
        // 'VL', // 45 (invalid format)
        // 'VC', // 95 (invalid format)
        // 'CLC', // 150 (invalid format)
        // 'DM', // 500 (invalid format)
        // 'LM', // 950 (invalid format)
        // 'VM', // 995 (invalid format)
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
        'XLV', // 45
        'L', // 50
        'LX', // 60
        'XC', // 90
        'XCV', // 95
        'C', // 100
        'CX', // 110
        'CL', // 150
        'CD', // 400
        'CDXCIX', // 499
        'D', // 500
        'CM', // 900
        'CML', // 950
        'CMXCV', // 995
        'M', // 1000
        'MCXI', // 1111
        'MDCCCCX', // 1910
        'MCMXII', // 1912
        'MM', // 2000
        'MMMCMXCIX', // 3999
        // Extended numbers
        'MN', // 4000
        'N', // 5000
        'NM', // 6000
        'NMM', // 7000
        'NMMM', // 8000
        'MH', // 9000
        'H', // 10000
        'HH', // 20000
        'HHH', // 30000
        'HP', // 40000
        'P', // 50000
        'PH', // 60000
        'PHH', // 70000
        'PHHH', // 80000
        'HG', // 90000
        'G', // 100000
        'GG', // 200000
        'GGG', // 300000
        'GF', // 400000
        'F', // 500000
        'FG', // 600000
        'FGG', // 700000
        'FGGG', // 800000
        'GS', // 900000
        'S', // 1000000
        'SGHMCXI', // 1111111
        'SSSFGGGPHHHNMMMDCCCLXXXVIII', // 3888888
        'SSSGSHGMHCMXCIX', // 3999999
    ];

    inputs.forEach(input => {
        const output = romanNumeralToInt(input);
        console.log(`output: ${output}`);
    });
}
