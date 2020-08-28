function wiggleSort(nums: number[]): void {
    nums.sort((a, b) => a - b);

    const length = nums.length;
    const halfwayPoint = Math.ceil(length / 2);
    const lows = nums.slice(0, halfwayPoint);
    const highs = nums.slice(halfwayPoint);

    for (let i = 0; i < length; i++) {
        if (i % 2 === 0) {
            nums[i] = lows.pop() || 0;
        }
        else {
            nums[i] = highs.pop() || 0;
        }
    }
}
