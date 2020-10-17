// Constraints:
// -100.0 < x < 100.0
// -2 ^ 31 <= n <= (2 ^ 31) -1
// -10 ^ 4 <= x ^ n <= 10 ^ 4

// Space O(1) - same space for all bases and numbers
// Time O(log(n)) - one action per binary digit of the exponent
function myPow(base: number, exponent: number): number {
    // n ^ 0 is 1 for all numbers
    if (exponent === 0) {
        return 1;
    }

    // 0 ^ n is always 0
    if (base === 0) {
        return 0;
    }

    let result = 1;
    let remainingBitsInExponent = Math.abs(exponent);
    // x ^ 10 is the same as (x ^ 2) * (x ^ 8)
    // We can convert the exponent to binary and if we multiply the base by itself for each digit of the exponent,
    // at each step the base will be equal to base ^ (2 ^ n). When the bit is set for the current digit of the exponent,
    // we add it to the cumulative result.
    while (remainingBitsInExponent > 0) {
        if (isLSBSet(remainingBitsInExponent)) {
            result *= base;
        }
        remainingBitsInExponent = removeLSB(remainingBitsInExponent);
        base *= base;
    }

    // negative exponents invert the base
    if (exponent < 0) {
        result = 1 / result;
    }

    return result;
}

function isLSBSet(value: number): boolean {
    // AND mask against 1 will only leave the LSB intact
    // 0b0001 & 0b1111 => 0b0001
    return (value & 1) === 1;
}

function removeLSB(value: number): number {
    // shifts the bits once to the right and fills with 0
    // Cannot use >> because it will propagate the MSB if it is 1
    // 0b1111 => 0b0111
    return value >>> 1;
}

export function runTests(): void {
    const inputs = [
        // [2, 10], // 1024
        // [2.1, 3], // 9.261
        // [2, -2], // 0.25
        [2, -2147483648], // 0 
    ];

    inputs.forEach(input => {
        const output = myPow(input[0], input[1]);
        console.log(output);
    });
}
