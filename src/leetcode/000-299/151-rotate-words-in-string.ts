// Time O(n)
// Space O(n)
// function reverseWordsInPlace(s: string): string {
//     // TypeScript creates a new string when it is mutated, so we break the string into an array of 
//     // characters to simulate a language which supports in-place string manipulation.
//     // This won't be counted as part of the Time/Space complexity
//     const words = s.split(/|/);
//     return s;
// }

function reverseWordsWithStack(s: string): string {
    const words = [];
    let wordStartIndex = null;

    for (let index = 0; index < s.length; index++) {
        const element = s[index];
        if (element == ' ') {
            if (wordStartIndex !== null) {
                words.push(s.substr(wordStartIndex, index - wordStartIndex));
                wordStartIndex = null;
            }
        }
        else {
            if (wordStartIndex === null) {
                wordStartIndex = index;
            }

            if (index === s.length - 1) {
                words.push(s.substr(wordStartIndex));
                wordStartIndex = null;
            }
        }
    }

    return words.reverse().join(' ');
}

// Time O(n)
// Space O(n)
function reverseWordsEasyVersion(s: string): string {
    // Time O(n) have to traverse entire string to do this
    // Space O(n) (build new string)
    const trimmedString = s.trim();

    // Time O(n) have to traverse entire string to do this
    // Space O(n) sum of array parts is full string
    const parts = trimmedString.split(/\s+/);

    // Space O(n) (build new string)
    return parts.reverse()
        .join(' ');
}

export function runTests(): void {
    const inputs = [
        // 'this word', // 'word this'
        'the sky is blue', //'blue is sky the'
        '  hello world  ', //'world hello'
        'a good   example', //'example good a'
        '  Bob    Loves  Alice   ', //'Alice Loves Bob'
        'Alice does not even like bob' //'bob like even not does Alice'
    ];

    inputs.forEach(input => {
        const output = reverseWordsWithStack(input);
        console.log(`*${output}*`);
    });
}
