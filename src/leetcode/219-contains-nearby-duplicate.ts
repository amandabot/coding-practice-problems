function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const checkedIndices = new Map<number, number[]>();
    return nums.some((num, index) => {
        const matches = checkedIndices.get(num) ?? [];
        const hasDuplicateInRange = matches.some(match => Math.abs(match - index) <= k);
        matches.push(index);
        checkedIndices.set(num, matches);

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
