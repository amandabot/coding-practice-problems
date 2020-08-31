function numIdenticalPairs(nums: number[]): number {
    const groupedNumbers = new Map<number, number[]>();
    let pairsFound = 0;

    nums.forEach((value, index)=> {
        const matchingNumbers = groupedNumbers.get(value) ?? [];
        pairsFound += matchingNumbers.length;
        matchingNumbers.push(index);
        groupedNumbers.set(value, matchingNumbers);
    });

    return pairsFound;
}

export function runTests(): void {
    const inputs = [
        [1,2,3,1,1,3],
        [1,1,1,1],
        [1,2,3]
    ];
    
    inputs.forEach(input =>{
        const output = numIdenticalPairs(input);
        console.log(output);
    });
}
