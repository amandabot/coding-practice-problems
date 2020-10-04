// Time O(n)
// Space O(1)
function maxArea(height: number[]): number {
    let start = 0;
    let end = height.length - 1;
    let highestArea = 0;

    while (start < end) {
        const startHeight = height[start];
        const endHeight = height[end];
        const area = (end - start) * Math.min(startHeight, endHeight);
        highestArea = Math.max(highestArea, area);

        if (startHeight < endHeight) {
            start += 1;
        }
        else {
            end -= 1;
        }
    }

    return highestArea;
}

export function runTests(): void {
    const inputs = [
        [1, 8, 6, 2, 5, 4, 8, 3, 7], //49
    ];

    inputs.forEach(input => {
        const output = maxArea(input);
        console.log(output);
    });
}
