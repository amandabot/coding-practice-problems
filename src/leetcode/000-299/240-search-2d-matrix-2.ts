// Time O(n + m)
// Space O(1)
function searchMatrix(matrix: number[][], target: number): boolean {
    if (matrix.length === 0) {
        return false;
    }

    let row = matrix.length - 1;
    let column = 0;
    const rowLength = matrix[0].length;

    let containsValue = false;
    // Time O(n + m) - worst case you make n + m operations
    while (row >= 0 && column < rowLength) {
        const value = matrix[row][column];
        if (value === target) {
            containsValue = true;
            break;
        }

        if (value > target) {
            row--;
        }
        else {
            column++;
        }
    }
    return containsValue;
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
    ];

    inputs.forEach(input => {
        const output = searchMatrix(input[0] as number[][], input[1] as number);
        console.log(output);
    });
    console.log('done');
}
