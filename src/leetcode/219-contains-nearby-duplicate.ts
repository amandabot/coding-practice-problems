function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const lastMatches = new Map<number, number>();
    return nums.some((num, index) => {
        const lastMatch = lastMatches.get(num) ?? Number.MIN_SAFE_INTEGER;
        const hasDuplicateInRange = Math.abs(lastMatch - index) <= k;
        lastMatches.set(num, index);

        return hasDuplicateInRange;
    });
}

export function runTests(): void {
    const inputs = [
        [[1, 2, 3, 1], 3],
        [[1, 0, 1, 1], 1],
        [[1, 2, 3, 1, 2, 3], 2]
    ];

    inputs.forEach(input => {
        const output = containsNearbyDuplicate(input[0] as number[], input[1] as number);
        console.log(output);
    });
}
