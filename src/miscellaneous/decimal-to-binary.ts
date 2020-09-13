function decimalToBinary(decimalValue: number): string {
    let currentValue = decimalValue;
    const reversedDigits = [];

    do {
        const remainder = currentValue % 2;
        reversedDigits.push(remainder);
        currentValue = (currentValue - remainder) / 2;
    }
    while (currentValue > 0)

    let binaryValue = '';
    for (let index = reversedDigits.length - 1; index >= 0; index -= 1) {
        binaryValue += `${reversedDigits[index]}`;
    }

    return binaryValue;
}

export function runTests(): void {
    const inputs = Array(10).fill(0).map((v, k) => k);

    inputs.forEach(input => {
        const output = decimalToBinary(input);
        console.log(output);
    });
}
