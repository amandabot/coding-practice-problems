const uniqueNumberNames = new Map<number, string>([
    [0, 'Zero'],
    [1, 'One'],
    [2, 'Two'],
    [3, 'Three'],
    [4, 'Four'],
    [5, 'Five'],
    [6, 'Six'],
    [7, 'Seven'],
    [8, 'Eight'],
    [9, 'Nine'],
    [10, 'Ten'],
    [11, 'Eleven'],
    [12, 'Twelve'],
    [13, 'Thirteen'],
    [14, 'Fourteen'],
    [15, 'Fifteen'],
    [16, 'Sixteen'],
    [17, 'Seventeen'],
    [18, 'Eighteen'],
    [19, 'Nineteen'],
    [20, 'Twenty'],
    [30, 'Thirty'],
    [40, 'Forty'],
    [50, 'Fifty'],
    [60, 'Sixty'],
    [70, 'Seventy'],
    [80, 'Eighty'],
    [90, 'Ninety']
]);

const powerOfTenSuffixes = new Map<number, string>([
    [2, 'Hundred'],
    [3, 'Thousand'],
    [4, 'Thousand'],
    [5, 'Thousand'],
    [6, 'Million'],
    [7, 'Million'],
    [8, 'Million'],
    [9, 'Billion'],
    [10, 'Billion'],
    [11, 'Billion']
]);

// Time O(log10(n)) - process log10(n) digits, 3 at a time
// Space O(log10(n)) - array space for log10(n) digit groups
// 0 <= num <= (2 ^ 31) - 1, 
function numberToWords(num: number): string {
    if (num < 91 && uniqueNumberNames.has(num)) {
        return uniqueNumberNames.get(num);
    }

    const words = [];
    let suffixExponent = 0;
    let remainingNumber = num;
    while (remainingNumber > 0) {
        const groupWords = [];
        const currentGroup = remainingNumber % 1000;
        let onesValue = currentGroup % 10;
        let tensValue = (currentGroup % 100);
        const hundredsValue = (currentGroup - (currentGroup % 100)) / 100;

        if (hundredsValue > 0) {
            groupWords.push(uniqueNumberNames.get(hundredsValue));
            groupWords.push(powerOfTenSuffixes.get(2));
        }

        // Does not have a unique name
        if (tensValue > 20 && onesValue !== 0) {
            tensValue -= onesValue;
        }
        else {
            onesValue = 0;
        }

        if (tensValue > 0) {
            groupWords.push(uniqueNumberNames.get(tensValue));
        }

        if (onesValue > 0) {
            groupWords.push(uniqueNumberNames.get(onesValue));
        }

        if (groupWords.length > 0 && powerOfTenSuffixes.has(suffixExponent)) {
            groupWords.push(powerOfTenSuffixes.get(suffixExponent));
        }

        if (groupWords.length > 0) {
            words.push(groupWords.join(' '));
        }

        suffixExponent += 3;
        remainingNumber = Math.floor(remainingNumber / 1000);
    }

    return words.reverse().join(' ');
}

export function runTests(): void {
    const inputs = [
        // 0, // Zero
        // 1, // One
        // 2, // Two
        // 3, // Three
        // 4, // Four
        // 5, // Five
        // 6, // Six
        // 7, // Seven
        // 8, // Eight
        // 9, // Nine
        // 10, // Ten
        // 11, // Eleven
        // 12, // Twelve
        // 13, // Thirteen
        // 14, // Fourteen
        // 15, // Fifteen
        // 16, // Sixteen
        // 17, // Seventeen
        // 18, // Eighteen
        // 19, // Nineteen
        // 20, // Twenty
        // 30, // Thirty
        // 40, // Forty
        // 50, // Fifty
        // 60, // Sixty
        // 70, // Seventy
        // 80, // Eighty
        // 90, // Ninety
        100, // One Hundred
        123, // One Hundred Twenty Three
        1000, // One Thousand
        10000, // Ten Thousand
        12345, // Twelve Thousand Three Hundred Forty Five
        100000, // One Hundred Thousand
        1000000, // One Million
        1234567, // One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven
        1000000000, // One Billion
        1234567891, // One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One
    ];

    inputs.forEach(input => {
        const output = numberToWords(input);
        console.log('#' + output + '#');
    });
}
