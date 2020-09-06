function containsDuplicate(nums: number[]): boolean {
    const checkedNumbers = new Set<number>(nums);
    return checkedNumbers.size !== nums.length;
}

export function runTests(): void {
    const inputs = [
        [1, 2, 3, 1],
        [1, 2, 3, 4],
        [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
    ];

    inputs.forEach(input => {
        const output = containsDuplicate(input);
        console.log(output);
    });
}
