// http://blog.gainlo.co/index.php/2017/01/20/arrange-given-numbers-to-form-the-biggest-number-possible/

import { swapValues } from '../shared/array';

function nextLargestNumber(original: number): number {
    const digits = splitNumberIntoDigits(original);
    const targetIndex = findIndexOfNonAscending(digits);

    // No next largest; the digits are in descending order
    if (targetIndex === -1) {
        return original;
    }

    const targetValue = digits[targetIndex];
    const nextLargestDigitIndex = findIndexOfNextLargestDigit(digits, targetValue, targetIndex - 1);
    swapValues(digits, targetIndex, nextLargestDigitIndex);

    // get remaining values in descending order because digits is reversed
    const remainingValues = digits.slice(0, targetIndex).sort((a, b) => b - a);
    copyArrayValues(remainingValues, digits)
    return convertDigitsToNumber(digits);
}

function copyArrayValues(source: number[], destination: number[]): void {
    for (let index = 0; index < source.length; index++) {
        destination[index] = source[index];
    }
}

// The index is the power of 10 for this number
function splitNumberIntoDigits(value: number): number[] {
    const digits = [];
    while (value > 0) {
        const remainder = value % 10;
        digits.push(remainder);
        value = Math.floor(value / 10);
    }
    return digits;
}

function findIndexOfNextLargestDigit(digits: number[], target: number, startIndex: number): number {
    let minimumLargerDigit = Number.MAX_SAFE_INTEGER;
    let foundIndex = -1;

    for (let index = startIndex; index >= 0; index--) {
        const digit = digits[index];

        // stop searching because this is the minimum possible value
        if (digit === target + 1) {
            foundIndex = index;
            break;
        }
        else if (digit > target && digit < minimumLargerDigit) {
            foundIndex = index;
            minimumLargerDigit = digit;
        }
    }

    return foundIndex;
}

function findIndexOfNonAscending(digits: number[]): number {
    let previousDigit = -1
    let index = 0;

    while (index < digits.length) {
        const digit = digits[index];
        if (digit < previousDigit) {
            break;
        }
        previousDigit = digit;
        index++;
    }

    return index === digits.length ? -1 : index;
}

function convertDigitsToNumber(digits: number[]): number {
    let number = 0;
    let base = 1;

    // if digits is descending, need to use a for loop starting from the end of array
    digits.forEach(digit => {
        number += digit * base;
        base *= 10;
    });

    return number;
}

export function runTests(): void {
    const inputs = [
        865432, // 865432
        423865, // 425368
        423862, // 426238
        1, // 1
        23, // 32
        1001, // 1010
        111101, // 111110
        133323, // 133332
        13333, // 31333
        1234567890, // 1234567908
    ];

    inputs.forEach(input => {
        const output = nextLargestNumber(input);
        console.log(output);
    });
}
