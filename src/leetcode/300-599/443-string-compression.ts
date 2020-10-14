let previousCharacter = null;
let previousCharacterCount = 0;
let lastInsertionPoint = 0;
let characterCount = 0;

// Time O(n) because we go through each char once
// Space O(1) - we use the same variables for any array, and modify the array itself
function compress(chars: string[]): number {
    if (chars.length === 1) {
        return 1;
    }

    previousCharacter = chars[0];
    previousCharacterCount = 0;
    lastInsertionPoint = 0;
    characterCount = 0;

    for (let index = 0; index < chars.length; index++) {
        const element = chars[index];
        if (element === previousCharacter) {
            previousCharacterCount += 1;
        }
        else {
            insertCharacter(previousCharacter, chars);

            previousCharacterCount = 1;
            previousCharacter = element;
        }
    }

    insertCharacter(previousCharacter, chars);

    return characterCount;
}

function insertCharacter(char: string, chars: string[]): void {
    chars[lastInsertionPoint] = char;
    characterCount += 1;
    lastInsertionPoint += 1;

    if (previousCharacterCount > 1) {
        const countAsString = previousCharacterCount.toString();

        countAsString.split(/|/).forEach(char => {
            chars[lastInsertionPoint] = char;
            lastInsertionPoint += 1;
        });

        characterCount += countAsString.length;
    }
}

export function runTests(): void {
    const inputs = [
        ['a', 'a', 'b', 'b', 'c', 'c', 'c'], // 6, ['a','2','b','2','c','3']
        ['a'], // 1, ['a']
        ['a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'], // 4, ['a','b','1','2']
    ];

    inputs.forEach(input => {
        const output = compress(input);
        console.log(`[${input.slice(0, output).join(', ')}]`);
    });
}
