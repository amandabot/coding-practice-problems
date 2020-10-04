function twoSum(nums: number[], target: number): number[] {
    // return firstGuess(nums, target);
    return solutionBasedOnHint(nums, target);
}

// Time O(nlog(n))
// Space O(1)
function firstGuess(nums: number[], target: number): number[] {
    const indices = [];

    // O(n)
    for (let index = 0; index < nums.length; index += 1) {
        const targetNumber = target - nums[index];

        // O(log(n))
        const indexOfPair = binarySearchIndex(targetNumber, nums, index + 1, nums.length - 1);
        if (indexOfPair !== -1) {
            // Problem specifies these are 1-based index
            indices.push(index + 1);
            indices.push(indexOfPair + 1);
            break;
        }
    }

    return indices;
}

// Time O(n)
// Space O(1)
function solutionBasedOnHint(nums: number[], target: number): number[] {
    const indices = [];
    let lowIndex = 0;
    let highIndex = nums.length - 1;

    // O(n)
    while (lowIndex < highIndex) {
        const sum = nums[lowIndex] + nums[highIndex];
        if (sum === target) {
            indices.push(lowIndex + 1, highIndex + 1);
            break;
        }
        else if (sum > target) {
            highIndex -= 1;
        }
        else {
            lowIndex += 1;
        }
    }

    return indices;
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

export function runTests(): void {
    const inputs = [
        [[2, 7, 11, 15], 9], // [1, 2]
        [[2, 3, 4], 6], // [1, 3]
        [[-1, 0], -1], // [1, 2]
        [[0, 0, 3, 4], 0], // [1, 2]
        [[1, 2, 3, 4, 5, 6, 7, 8], 14] // [6, 8]
    ];

    inputs.forEach(input => {
        const output = twoSum(input[0] as number[], input[1] as number);
        console.log(output);
    });
}
