/**
 Do not return anything, modify matrix in-place instead.
 */
// Time O(n ^ 2) where n is the length of one of the matrix's sides
// Space O(1) because we use the same number of variables regardless of the size
function rotate(matrix: number[][]): void {
    const fullRowLength = matrix[0].length;

    // follow the diagonal from 0,0 to mid, mid
    // starting from the cell until the middle, perform rotation sequence
    let partialRowLength = fullRowLength - 1;
    let lastColumnToProcess = partialRowLength;

    for (let row = 0; row < fullRowLength / 2; row++) {
        for (let column = row; column < lastColumnToProcess; column++) {
            const cell1 = new Cell({
                row: row,
                column: column
            });
            const cell2 = new Cell({
                row: cell1.row + column - row,
                column: cell1.column + partialRowLength - column + row
            });
            const cell3 = new Cell({
                row: cell2.row + partialRowLength - column + row,
                column: cell2.column - column + row
            });
            const cell4 = new Cell({
                row: cell3.row - column + row,
                column: cell3.column - (partialRowLength - column + row)
            });

            const cellOneValue = getCellValue(cell1, matrix);
            const cellTwoValue = getCellValue(cell2, matrix);
            const cellThreeValue = getCellValue(cell3, matrix);
            const cellFourValue = getCellValue(cell4, matrix);
            setCellValue(cell1, cellFourValue, matrix);
            setCellValue(cell2, cellOneValue, matrix);
            setCellValue(cell3, cellTwoValue, matrix);
            setCellValue(cell4, cellThreeValue, matrix);
        }

        // after swaps
        partialRowLength -= 2;
        lastColumnToProcess -= 1;
    }
}

class Cell {
    row: number;
    column: number;
    value: number;

    constructor(options?: Partial<Cell>) {
        Object.assign(this, options);
    }
}

function getCellValue(cell: Cell, matrix: number[][]): number {
    return matrix[cell.row][cell.column];
}

function setCellValue(cell: Cell, value: number, matrix: number[][]): void {
    matrix[cell.row][cell.column] = value;
}

// Time O(n^2) for matrix length N. We process (n -1 + n -2 ... 1) cells
// The sum of numbers from 1..n is n(n + 1) / 2
// Space O(1) we use the same variables regardless of 
function rotateWithHint(matrix: number[][]): void {
    let low = 0;
    let high = matrix.length - 1;

    // reverse the order of rows
    while (high > low) {
        const temp = matrix[low];
        matrix[low] = matrix[high];
        matrix[high] = temp;
        low += 1;
        high -= 1;
    }

    // reverse along the diagonal from 0,0 to n,n
    for (let row = 0; row < matrix.length; row++) {
        for (let column = row + 1; column < matrix.length; column++) {
            const temp = matrix[row][column];
            matrix[row][column] = matrix[column][row];
            matrix[column][row] = temp;
        }
    }
}

export function runTests(): void {
    const inputs = [
        [[1, 2], [3, 4]], // [[3,1],[4,2]]
        [[1, 2, 3], [4, 5, 6], [7, 8, 9]], // [[7,4,1],[8,5,2],[9,6,3]]
        [[1]], // [[1]]
        [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]], // 
        [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]], // 
    ];

    inputs.forEach(input => {
        rotateWithHint(input);
        input.forEach(row => {
            console.log(`[${row.join(',')}]`);
        });
    });
}
