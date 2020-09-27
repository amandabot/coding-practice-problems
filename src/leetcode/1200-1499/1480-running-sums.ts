function runningSum(nums: number[]): number[] {
    let currentSum = 0;
    
    return nums.map(value => {
        currentSum += value;
        return currentSum;
    });
}

export function runTests(): void {
    const inputs = [
        [1,2,3,4],
        [1,1,1,1,1],
        [3,1,2,10,1]
    ];
    
    inputs.forEach(input =>{
        const output = runningSum(input);
        console.log(output);
    });
}
