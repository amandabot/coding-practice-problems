// Time O(log(n*m)) - we do a binary search over the length of the 2 dimensions as if it were a 1-dimensional array
// Space O(1)
function searchMatrix(matrix: number[][], target: number): boolean {
    if (matrix.length === 0) {
        return false;
    }

    let high = (matrix.length * matrix[0].length) - 1;
    let low = 0;
    const rowLength = matrix[0].length;

    let containsValue = false;
    while (high >= low) {
        const midpoint = Math.floor(low + ((high - low) / 2));
        const coordinate = convertToCoordinate(midpoint, rowLength);
        const value = matrix[coordinate.row][coordinate.column];
        if (value === target) {
            containsValue = true;
            break;
        }

        if (value > target) {
            high = midpoint - 1;
        }
        else {
            low = midpoint + 1;
        }
    }
    return containsValue;
}

class Coordinate {
    row: number;
    column: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }
}

function convertToCoordinate(position: number, rowWidth: number): Coordinate {
    const oneBasedIndex = position + 1;
    // Offset by 1 for 0-based indices
    const row = Math.ceil(oneBasedIndex / rowWidth) - 1;
    const column = (position % rowWidth);
    return new Coordinate(row, column);
}

export function runTests(): void {
    const inputs = [
        [
            [
                [1, 4, 7, 11, 15],
                [2, 5, 8, 12, 19],
                [3, 6, 9, 16, 22],
                [10, 13, 14, 17, 24],
                [18, 21, 23, 26, 30]
            ],
            5
        ], // true
        [
            [
                [1, 4, 7, 11, 15],
                [2, 5, 8, 12, 19],
                [3, 6, 9, 16, 22],
                [10, 13, 14, 17, 24],
                [18, 21, 23, 26, 30]
            ],
            20
        ], // false
        [
            [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 50]],
            3
        ], // true
        [
            [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 50]],
            13
        ], // false
        [
            [],
            0
        ], // false
        [
            [[1]],
            0
        ], // false
    ];

    inputs.forEach(input => {
        const output = searchMatrix(input[0] as number[][], input[1] as number);
        console.log(output);
    });
    console.log('done');
}
