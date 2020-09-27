function reverseString(s: string[]): void {
    for (let index = 0; index < s.length / 2; index += 1) {
        const temp = s[index];
        const mirrorIndex = s.length - index - 1;
        s[index] = s[mirrorIndex];
        s[mirrorIndex] = temp;
    }
}

export function runTests(): void {
    const inputs = [
        ['h', 'e', 'l', 'l', 'o'],
        ['H', 'a', 'n', 'n', 'a', 'h']
    ];

    inputs.forEach(input => {
        reverseString(input);
        console.log(input);
    });
}
