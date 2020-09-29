// Time O(n)
// Space O(n)
function twoSum(nums: number[], target: number): number[] {
    const indices = [];
    // space O(n)
    const indiciesOfRequiredPairs = [];

    // O(n)
    for (let index = 0; index < nums.length; index += 1) {
        const targetNumber = target - nums[index];

        // O(1)
        const indexOfPair = indiciesOfRequiredPairs[targetNumber];
        if (indexOfPair === undefined) {
            indiciesOfRequiredPairs[nums[index]] = index;
        }
        else {
            indices.push(indexOfPair);
            indices.push(index);
            break;
        }
    }

    return indices;
}

export function runTests(): void {
    const inputs = [
        [[2, 7, 11, 15], 9], // [0,1]
        [[3, 2, 4], 6], // [1,2]
        [[3, 3], 6], // [0, 1]
        [[0, 4, 3, 0], 0] // [0,3]
    ];

    inputs.forEach(input => {
        const output = twoSum(input[0] as number[], input[1] as number);
        console.log(output);
    });
}
