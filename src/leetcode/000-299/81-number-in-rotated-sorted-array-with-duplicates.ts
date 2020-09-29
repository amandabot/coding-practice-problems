// Time n + log(n) -> O(n)
// Space O(1)
function search(nums: number[], target: number): boolean {
    if (nums.length === 0) {
        return false;
    }

    if (nums.length === 1) {
        return nums[0] === target;
    }

    // O(log(n))
    let originalEndIndex = findOriginalEndIndex(nums, 0, nums.length - 1);

    // Array wasn't pivoted
    if (originalEndIndex === -1) {
        originalEndIndex = nums.length - 1;
    }

    let start = 0;
    let end = originalEndIndex;
    if (nums[0] > target || target > nums[originalEndIndex]) {
        start = originalEndIndex + 1;
        end = nums.length - 1;
    }

    // O(log(n))
    return binarySearchIndex(target, nums, start, end);
}

// Time: O(log(n))
// Space: O(1)
function binarySearchIndex(target: number, nums: number[], start: number, end: number): boolean {
    let low = start;
    let high = end;

    while (true) {
        if (high < low) {
            return false;
        }

        const midPoint = low + Math.floor((high - low) / 2);

        if (nums[midPoint] === target) {
            return true;
        }

        if (nums[low] === nums[high]) {
            // this chunk contains repeated numbers which are not the target
            return false;
        }

        if (nums[midPoint] < target) {
            low = midPoint + 1;
        }

        if (nums[midPoint] > target) {
            high = midPoint - 1;
        }
    }
}

// Uses binary search
// Time: Worst: O(n) (all duplicate values) Average: O(log(n))
// Space: O(1)
function findOriginalEndIndex(nums: number[], start: number, end: number): number {
    const rangeLength = end - start + 1;
    const midpoint = start + Math.floor(rangeLength / 2);

    if (nums[midpoint] > nums[midpoint + 1]) {
        return midpoint;
    }

    if (nums[midpoint - 1] > nums[midpoint]) {
        return midpoint - 1;
    }

    if (rangeLength === 2) {
        return -1;
    }

    const leftPivot = findOriginalEndIndex(nums, start, midpoint);
    if (leftPivot !== -1) {
        return leftPivot;
    }

    const rightPivot = findOriginalEndIndex(nums, midpoint, end);
    return rightPivot;
}

export function runTests(): void {
    const inputs = [
        [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 1], // true
        [[0, 0, 0, 1, 1, 1, 2, 2, 2, 2], 1], // true
        [[0, 0, 1, 0, 0, 0, 0, 0, 0, 0], 1], // true
        [[2, 5, 6, 0, 0, 1, 2], 0], // true
        [[1, 3], 1], // true
        [[4, 5, 6, 7, 0, 0, 1, 2], 0], // true
        [[6, 8, 10, 12, 12, 0, 2, 4, 4,], 10], // true
        [[12, 0, 2, 4, 6, 8, 10], 4], // true
        [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 0], // false
        [[0, 0, 0, 1, 1, 1, 2, 2, 2, 2], 3], // false
        [[2, 5, 6, 0, 0, 1, 2], 3], // false
        [[4, 5, 6, 7, 0, 1, 2], 3], // false
        [[1, 2, 3, 3, 4, 5, 6, 7, 7, 0], 8], // false
        [[1, 1], 0], // false
        [[1], 0], // false
        [[], 15] // false
    ];

    inputs.forEach(input => {
        const output = search(input[0] as number[], input[1] as number);
        console.log(output);
    });
}
