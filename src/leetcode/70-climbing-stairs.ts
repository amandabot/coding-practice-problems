function climbStairs(n: number): number {
    if (n <= 0) {
        return 0;
    }
    else if (n === 1) {
        return 1;
    }
    else if (n === 2) {
        return 2;
    }

    let oneStepBefore = 2;
    let twoStepsBefore = 1;
    let count = 0;

    for (let index = 2; index < n; index += 1) {
        count = oneStepBefore + twoStepsBefore;
        twoStepsBefore = oneStepBefore;
        oneStepBefore = count;
    }

    return count;
}

export function runTests(): void {
    const inputs = Array(45).fill(0).map((v, k) => k + 1);

    inputs.forEach(input => {
        const output = climbStairs(input);
        console.log(output);
    });
}
