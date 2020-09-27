function shuffle(nums: number[], n: number): number[] {
    const shuffled = [];

    for (let i = 0; i < n; i += 1) {
        let index = i * 2;
        shuffled[index] = nums[i];
        shuffled[index + 1] = nums[i + n];
    }

    return shuffled;
}

export function runTests(): void {
    const inputs = [
        [[2, 5, 1, 3, 4, 7], 3],
        [[1, 2, 3, 4, 4, 3, 2, 1], 4],
        [[1, 1, 2, 2], 2]
    ];

    inputs.forEach(input => {
        const output = shuffle(input[0] as number[], input[1] as number);
        console.log(output);
    });
}
