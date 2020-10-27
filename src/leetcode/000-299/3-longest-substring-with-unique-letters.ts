function lengthOfLongestSubstring(input: string): number {
    if (input.length === 0) {
        return 0;
    }

    const lastCharacterPosition = new Map<string, number>();

    let maxLength = 0;
    let startIndex = 0;
    let endIndex = 0;
    while (endIndex < input.length) {
        const character = input[endIndex];
        if (lastCharacterPosition.has(character)) {
            const lastUniqueIndex = (lastCharacterPosition.get(character) ?? 0) + 1;
            startIndex = Math.max(startIndex, lastUniqueIndex);
        }

        maxLength = Math.max(maxLength, (endIndex - startIndex + 1));
        lastCharacterPosition.set(character, endIndex);
        endIndex++;
    }

    return maxLength;
}

export function runTests(): void {
    const inputs = [
        'alouzxilkaxkufsu', // 8
        'tmmzuxt', // 5
        'abcdefedcbax', // 7
        'abcabcbb', // 3
        'bbbbb', // 1
        'pwwkew', // 3,
        '', // 0
        'a', // 1
    ];

    inputs.forEach(input => {
        const output = lengthOfLongestSubstring(input);
        console.log(output);
    });
}
