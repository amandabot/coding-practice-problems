function isPerfectSquare(num: number): boolean {
    if (num === 1 || num === 0) {
        return true;
    }

    if (num < 0) {
        return false;
    }

    let low = 1;
    let high = num;
    let isPerfectSquare = false;

    while (high - low > 1) {
        const guess = Math.floor((high + low) / 2);
        const result = guess * guess;
        if (result === num) {
            isPerfectSquare = true;
            break;
        }
        else if (result > num) {
            high = guess;
        }
        else {
            low = guess;
        }
    }

    return isPerfectSquare;
}

export function runTests(): void {
    const inputs = [
        16, // true
        4, // true
        14, // false
        100, // true
        191, // false
    ];

    inputs.forEach(input => {
        const output = isPerfectSquare(input);
        console.log(output);
    });
}
