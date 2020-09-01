function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
    const maxAmountOfCandy = Math.max(...candies);
    return candies.map(count => count + extraCandies >= maxAmountOfCandy);
}

export function runTests(): void {
    const inputs = [
        [[2,3,5,1,3], 3],
        [[4,2,1,1,2], 1],
        [[12,1,12], 10]
    ];

    inputs.forEach(input => {
        const output = kidsWithCandies(input[0] as number[], input[1] as number);
        console.log(output);
    });
}
