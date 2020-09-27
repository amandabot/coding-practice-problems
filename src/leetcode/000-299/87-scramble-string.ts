// Had to borrow this solution from someone else, but I was able to clean up the code a bit and make it easier to follow
let cache: Map<string, boolean>;

function isScramble(s1: string, s2: string): boolean {
    if (s1.length != s2.length) return false;
    if (s1.length == 0) return false;
    cache = new Map<string, boolean>();
    return compareStrings(s1, s2);
}

function compareStrings(s1: string, s2: string): boolean {
    const hash = `${s1}_${s2}`;
    if (cache.get(hash)) {
        return cache.get(hash);
    }

    if (s1.localeCompare(s2) === 0) return true;
    if (s1.length <= 1) return false;

    let isScrambled = false;
    let isSwapped = false;
    let isNotSwapped = false;

    for (let index = 1; index < s1.length; index += 1) {
        const headOfOne = s1.slice(0, index);
        const tailOfOne = s1.slice(index);
        const headOfTwo = s2.slice(0, index);
        const tailOfTwo = s2.slice(index);
        const invertedHeadOfTwo = s2.slice(0, -index);
        const invertedTailOfTwo = s2.slice(-index);

        if (compareStrings(headOfOne, invertedTailOfTwo) && compareStrings(tailOfOne, invertedHeadOfTwo)) {
            isSwapped = true;
        }
        else if (compareStrings(headOfOne, headOfTwo) && compareStrings(tailOfOne, tailOfTwo)) {
            isNotSwapped = true;
        }

        if (isSwapped || isNotSwapped) {
            isScrambled = true;
            break;
        }
    }
    cache.set(hash, isScrambled);
    return isScrambled;
}

export function runTests(): void {
    const inputs = [
        ['great', 'rgeat'],
        ['abcde', 'caebd'],
        ['a', 'a'],
    ];

    inputs.forEach(input => {
        const output = isScramble(input[0], input[1]);
        console.log(output);
    });
}
