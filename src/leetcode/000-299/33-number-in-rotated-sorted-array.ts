// Time 2log(n) -> O(log(n))
// Space O(1)
function search(nums: number[], target: number): number {
    if (nums.length === 0) {
        return -1;
    }

    if (nums.length === 1) {
        return nums[0] === target ? 0 : -1;
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
function binarySearchIndex(target: number, nums: number[], start: number, end: number): number {
    let low = start;
    let high = end;

    while (true) {
        if (high < low) {
            return -1;
        }

        const midPoint = low + Math.floor((high - low) / 2);

        if (nums[midPoint] === target) {
            return midPoint;
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
// Time: O(log(n))
// Space: O(1)
function findOriginalEndIndex(nums: number[], start: number, end: number): number {
    const rangeLength = end - start + 1;
    const midpoint = start + Math.floor((end - start) / 2);

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

function improvedSearch(nums: number[], target: number): number {
    // find midpoint
    // if num[midpoint] == target, return midpoint
    // if num[midpoint] < num[0] && num[last] // pivot is < midpoint
    //   if num[mid] < target < num[last], search here
    //   else search num[0 - midpoint] 
    // if num[midpoint] > num[0] && num[last] // pivot is > midpoint
    //   if num[0] < target < num[mid], search here
    //   else search num[mid - last] 
    return searchArray(nums, target, 0, nums.length - 1);
}

function searchArray(nums: number[], target: number, start: number, end: number): number {
    if (!nums || nums.length === 0) {
        return -1;
    }

    if (start === end) {
        return nums[start] === target ? start : -1;
    }

    if (start < end) {
        const midpoint = start + Math.floor((end - start) / 2);
        const midpointValue = nums[midpoint];
        const startValue = nums[start];
        const endValue = nums[end];

        if (midpointValue === target) {
            return midpoint;
        }

        // pivot is < midpoint
        else if (midpointValue < startValue && midpointValue < endValue) {
            if (target > midpointValue && target <= endValue) {
                return searchArray(nums, target, midpoint + 1, end);
            }
            else {
                return searchArray(nums, target, start, midpoint - 1);
            }
        }
        // num[midpoint] > num[0] && num[last]; pivot is > midpoint
        else {
            if (target >= startValue && target < midpointValue) {
                return searchArray(nums, target, start, midpoint - 1);
            }
            else {
                return searchArray(nums, target, midpoint + 1, end);
            }
        }
    }
}

function isPivotLessThanMidpoint(start: number, middle: number, end: number, target: number): boolean {
    return isBetween(start, end, middle) && isBetween(middle, target, end + 1);
}

function isBetween(start: number, end: number, target: number): boolean {
    return start < target && target < end;
}

export function runTests(): void {
    const inputs = [
        [[1, 3], 1], // 0
        [[3, 1], 1], // 1
        [[4, 5, 6, 7, 0, 1, 2], 0], // 4
        [[6, 8, 10, 12, 0, 2, 4,], 10], // 2
        [[12, 0, 2, 4, 6, 8, 10], 4], // 3
        [[4, 5, 6, 7, 0, 1, 2], 3], // -1
        [[1, 2, 3, 4, 5, 6, 7, 0], 8], // -1
        [[1], 0], // -1
        [[], 15] // -1
    ];

    inputs.forEach(input => {
        const output = improvedSearch(input[0] as number[], input[1] as number);
        console.log(output);
    });
}
