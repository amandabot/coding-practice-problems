// Time O(n)
// Space O(n)
// Assume all characters are digits; string is [1,100] in length
let memo: { [key: string]: number } = {};

function numDecodings(s: string): number {
    if (s.length === 0) {
        return 1;
    }

    if (s.length === 1) {
        return s[0] == '0' ? 0 : 1;
    }

    // any multiple of 10 greater than 20 is not a valid letter
    if (/[3-9][0]/.test(s)) {
        return 0;
    }

    memo = {};

    const value = countDecodings(s);

    Object.keys(memo).forEach(key => {
        console.log(`key: ${key}, value: ${memo[key]}`);
    });
    return value;
}

function countDecodings(s: string): number {
    if (s.length === 0) {
        return 0;
    }

    if (memo[s] !== undefined) {
        return memo[s];
    }

    if (s.length === 1) {
        memo[s] = countSingle(s);
        return memo[s];
    }

    if (s.length === 2) {
        memo[s] = countPair(s);
        return memo[s];
    }

    const twoValue = Number.parseInt(s.substr(0, 2), 10);
    const isTwoValid = twoValue <= 26 && s[0] !== '0';
    const countOneRemainder = countDecodings(s.substr(1));
    memo[s.substr(1)] = countOneRemainder;
    const countTakeOne = countDecodings(s.substr(0, 1)) * countOneRemainder;

    const countTwoRemainder = countDecodings(s.substr(2));
    memo[s.substr(2)] = countTwoRemainder;
    const countTakeTwo = (isTwoValid ? 1 : 0) * countTwoRemainder;
    return countTakeOne + countTakeTwo;
}

function countSingle(s: string): number {
    return s[0] !== '0' ? 1 : 0;
}

function countPair(s: string): number {
    let amount = 2;
    const value = Number.parseInt(s, 10);
    if (value > 26 || s[0] === '0') {
        // two-digit fails
        amount--;
    }

    if (s[0] === '0' || s[1] === '0') {
        // single digit fails
        amount--;
    }
    return amount;
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
