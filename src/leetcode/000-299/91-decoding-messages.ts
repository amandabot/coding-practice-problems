// Time O(n)
// Space O(n)
// Assume all characters are digits; string is [1,100] in length
let memo: { [key: string]: number } = {};

function numDecodings(s: string): number {
    memo = {};

    return countDecodings(s, s.length);
}

function countDecodings(fullInput: string, charsFromEnd: number): number {
    if (charsFromEnd === 0) {
        return 1;
    }

    const startIndex = fullInput.length - charsFromEnd;
    if (fullInput[startIndex] === '0') {
        return 0;
    }

    const memoKey = fullInput.substr(startIndex);
    if (memo[memoKey] !== undefined) {
        return memo[memoKey];
    }

    let result = countDecodings(fullInput, charsFromEnd - 1);
    if (charsFromEnd >= 2 && Number.parseInt(fullInput.substr(startIndex, 2), 10) <= 26) {
        result += countDecodings(fullInput, charsFromEnd - 2);
    }
    memo[fullInput] = result;
    return result;
}

export function runTests(): void {
    const inputs = [
        '12', //2
        '226', // 3
        '0', // 0
        '1', // 1
        '12305', // 0
        '45', // 1
        '345', // 1
        '2345', // 2
        '12345', // 3
        '11111', // 8
        '111111', // 13
        '1111111', // 21
        '101110', // 2
        '111111111111111111111111111111111', // 5702887
    ];

    inputs.forEach(input => {
        const output = numDecodings(input);
        console.log(output);
    });
}
