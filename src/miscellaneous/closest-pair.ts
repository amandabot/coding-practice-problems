// Time O(nlog(n)) due to sort
// Space O(n) or O(1) depending on the sorting algorithm
function closestPair(arr1: number[], arr2: number[], target: number): number[] {
    // Time O(nlog(n))
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    let xCoor = arr1.length - 1;
    let yCoor = 0;
    let closestValues = [];
    let minDistance = Number.MAX_SAFE_INTEGER;

    // Time O(n) - worst case you iterate the entirety of arr1 and arr2 once (n + n) => n
    while (xCoor >= 0 && yCoor < arr2.length) {
        const value = arr1[xCoor] + arr2[yCoor];
        const distance = Math.abs(target - value);
        if (distance < minDistance) {
            closestValues = [arr1[xCoor], arr2[yCoor]];
            minDistance = distance;
        }

        if (value > target) {
            xCoor--;
        }
        else {
            yCoor++;
        }
    }
    return closestValues;
}

// Time O(nlog(n)) due to sort
// Space O(n) or O(1) depending on the sorting algorithm; O(n) for storing the pairs
function allClosestPairs(arr1: number[], arr2: number[], target: number): number[][] {
    // Time O(nlog(n))
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    let xCoor = arr1.length - 1;
    let yCoor = 0;
    // Space O(n) if every pair matches our criteria
    let closestValues = [];
    let minDistance = Number.MAX_SAFE_INTEGER;

    // Time O(n) - worst case you iterate the entirety of arr1 and arr2 once (n + n) => n
    while (xCoor >= 0 && yCoor < arr2.length) {
        const value = arr1[xCoor] + arr2[yCoor];
        const distance = Math.abs(target - value);
        if (distance < minDistance) {
            closestValues = [[arr1[xCoor], arr2[yCoor]]];
            minDistance = distance;
        }
        else if (distance === minDistance) {
            closestValues.push([arr1[xCoor], arr2[yCoor]]);
        }

        if (value > target) {
            xCoor--;
        }
        else {
            yCoor++;
        }
    }
    return closestValues;
}

// Time O(n * x) where x is the number of steps you might need
// Space O(n) for creating the Set
function closestPairMoveTargetBySteps(arr1: number[], arr2: number[], target: number): number[] {
    const set = new Set<number>(arr1);
    let result = null;

    let upper = target;
    let lower = target;

    while (true) {
        for (let index = 0; index < arr2.length; index++) {
            const value = arr2[index];
            const matchingLower = lower - value;
            if (set.has(matchingLower)) {
                result = [value, matchingLower];
                break;
            }

            const matchingUpper = upper - value;
            if (set.has(matchingUpper)) {
                result = [value, matchingUpper];
                break;
            }
        }

        if (result !== null) {
            break;
        }
        upper += 1;
        lower -= 1;
    }

    return result;
}

// Time O(n^2) due to comparing each array value to the others
// Space O(1) space is same for all inputs
function closestPairNaive(arr1: number[], arr2: number[], target: number): number[] {
    let minDistance = Number.MAX_SAFE_INTEGER;
    let match = null;

    for (let index1 = 0; index1 < arr1.length; index1++) {
        for (let index2 = 0; index2 < arr2.length; index2++) {
            const result = target - arr1[index1] - arr2[index2];
            if (result < minDistance) {
                minDistance = result;
                match = [arr1[index1], arr2[index2]];
            }
        }
    }

    return match;
}

export function runTests(): void {
    const inputs = [
        [
            [7, 4, 1, 10],
            [4, 5, 8, 7],
            13
        ], // [7,7], [10,4], [4,8], [7,5]
        [
            [-1, 3, 8, 2, 9, 5],
            [4, 1, 2, 10, 5, 20],
            24
        ], // [3,20] or [5,20] depending on implementation
        [
            [10, 3], // 5,2
            [3, 5], // 2,0
            5
        ], // [3,3]
    ];

    inputs.forEach(input => {
        const output = allClosestPairs(input[0] as number[], input[1] as number[], input[2] as number);
        console.log(output);
    });
    console.log('done');
}
