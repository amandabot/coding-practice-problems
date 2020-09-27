function isHappy(n: number): boolean {
    let previousValues = new Set<number>();
    let currentValue = n;
    let hasFoundPreviousValue = false;

    while (!hasFoundPreviousValue) {
        const digits = Array.from(currentValue.toString());
        currentValue = digits.reduce((acc, current) => {
            return acc + Math.pow(Number.parseInt(current), 2);
        }, 0);
        hasFoundPreviousValue = previousValues.has(currentValue);
        previousValues.add(currentValue);
    }

    return currentValue === 1;
}

export function runTests(): void {
    const inputs = [
        19,
        1,
        100,
        101
    ];

    inputs.forEach(input => {
        const output = isHappy(input);
        console.log(output);
    });
}
