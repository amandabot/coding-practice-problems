export class MountainArray {
    private values: number[];
    private callsMade = 0;

    get(index: number): number {
        this.callsMade += 1;
        return this.values[index];
    }

    length(): number {
        return this.values.length;
    }

    getCallsMade(): number {
        return this.callsMade;
    }

    constructor(values: number[]) {
        this.values = values;
    }
}

// Time O(log(n)) since it's all binary searches
// Space O(1) - no input-dependent space used
function findInMountainArray(target: number, array: MountainArray): number {
    // The peak cannot be at the first or last positions because it must have a number on each side
    let low = 1;
    let high = array.length() - 2;
    let midpoint = 0;
    while (high >= low) {
        midpoint = low + Math.floor((high - low) / 2);

        const midpointValue = array.get(midpoint);
        const leftValue = array.get(midpoint - 1);
        const rightValue = array.get(midpoint + 1);

        if (leftValue < midpointValue && rightValue < midpointValue) {
            // midpoint
            break;
        }
        else if (leftValue < midpointValue && rightValue > midpointValue) {
            // left half
            low = midpoint + 1;
        }
        else if (leftValue > midpointValue && rightValue < midpointValue) {
            // right half
            high = midpoint - 1;
        }
        else {
            // malformed array
            return - 1;
        }
    }

    const leftIndex = binarySearchAsc(0, midpoint, array, target);
    if (leftIndex !== -1) {
        return leftIndex;
    }
    return binarySearchDesc(midpoint, array.length(), array, target);
}

function binarySearchAsc(low: number, high: number, array: MountainArray, target: number): number {
    return binarySearch(low, high, array, target, true);
}

function binarySearchDesc(low: number, high: number, array: MountainArray, target: number): number {
    return binarySearch(low, high, array, target, false);
}

function binarySearch(low: number, high: number, array: MountainArray, target: number, isAsc: boolean): number {
    let midpoint = 0;
    while (high >= low) {
        midpoint = low + Math.floor((high - low) / 2);

        const midpointValue = array.get(midpoint);
        if (midpointValue === target) {
            return midpoint;
        }
        else if ((target < midpointValue) && isAsc) {
            return binarySearchAsc(low, midpoint - 1, array, target);
        }
        else {
            return binarySearchAsc(midpoint + 1, high, array, target);
        }
    }
    return -1;
}

export function runTests(): void {
    const inputs = [
        [3, [1, 2, 3, 4, 5, 3, 1]], // 2
        [3, [0, 1, 2, 4, 2, 1]], // -1
        [3, [1, 2, 3, 4, 5, 4, 3, 2, 1]], // 2
        [1, [1, 5, 2]], // 0
        [1, [0, 5, 3, 1]], // 3
        [0, [3, 5, 3, 2, 0]], // 4
        [1, [1, 5, 2]], // 0
    ];

    inputs.forEach(input => {
        const output = findInMountainArray(input[0] as number, new MountainArray(input[1] as number[]));
        console.log(output);
    });
}
