// http://blog.gainlo.co/index.php/2017/01/20/arrange-given-numbers-to-form-the-biggest-number-possible/

function largestNumber(original: number): number {
    const digits = splitNumberIntoDigits(original);
    // sort ascending because we will add these from smallest to largest
    digits.sort((a, b) => a - b);
    return convertDigitsToNumber(digits);
}

function splitNumberIntoDigits(value: number): number[] {
    const digits = [];
    while (value > 0) {
        const remainder = value % 10;
        digits.push(remainder);
        value = Math.floor(value / 10);
    }
    return digits;
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
        423865, // 865432
        423862, // 864322
        1, // 1
        1000, // 1000
        1234567890, // 9876543210
    ];

    inputs.forEach(input => {
        const output = largestNumber(input);
        console.log(output);
    });
}
