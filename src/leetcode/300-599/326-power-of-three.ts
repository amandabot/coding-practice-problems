function isPowerOfThree(n: number): boolean {
    return (Math.log10(n) /  Math.log10(3)) % 1 === 0;
}

function isPowerOfThreeAlternate(n: number): boolean {
    return Number.isInteger(Math.log10(n) /  Math.log10(3));
}

export function runTests(): void {
    const inputs = [27, 9, 0, 45];

    inputs.forEach(input => {
        console.log(input);
        const output = isPowerOfThree(input);
        console.log(output);
        const outputAlt = isPowerOfThreeAlternate(input);
        console.log(outputAlt);
    });
}
