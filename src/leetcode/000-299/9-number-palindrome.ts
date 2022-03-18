function isPalindrome(value: number): boolean {
    if (value < 0) {
        return false;
    }

    // For a number, the head is the number representing the largest place
    // and the tail is the number representing the 1s place
    let headPowerOfTen = Math.floor(Math.log10(value));
    let remainingNumber = value;
    let isPalindrome = true;

    // Once the number has been reduced to a single digit, if it has not been disqualified,
    // then this must be a palindrome
    while (remainingNumber > 9 || headPowerOfTen > 0) {
        const headPowerOfTenValue = Math.pow(10, headPowerOfTen);
        const headDigit = Math.floor(remainingNumber / headPowerOfTenValue);
        const tailDigit = remainingNumber % 10;

        if (headDigit !== tailDigit) {
            isPalindrome = false;
            break;
        }

        // This could also be: remainingNumber - (remainingNumber % headPowerOfTenValue)
        // e.g. 999 - (999 % 100) => 999 - (99) => 900
        const headValue = headDigit * headPowerOfTenValue;

        // Removing the head value will eliminate the head digit.
        // Dividing by 10 will eliminate the 1s place.
        // Math.floor will remove the decimal portion of the number
        remainingNumber = Math.floor((remainingNumber - headValue) / 10);

        // By removing the head and tail digit, we have effectively divided the number by 100.
        // This means the head's power of ten is now 2 less than before: log10(100) => 2.
        headPowerOfTen = headPowerOfTen - 2;
    }

    return isPalindrome;
}

export function runTests(): void {
    const inputs = [
        0, // true
        7, // true
        33, // true
        121, // true
        101, // true
        10001, // true,
        10301, // true,
        103040301, // true,
        123454321, // true
        10, // false
        321, // false
        -111, // false
        -11, // false
        -1, // false
        1021, // false
        102001, // false
        10021, // false
        1000021, // false
        123456321, // false
    ];

    inputs.forEach(input => {
        const output = isPalindrome(input);
        console.log(output);
    });
}
