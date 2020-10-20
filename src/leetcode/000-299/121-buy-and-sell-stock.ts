function maxProfit(prices: number[]): number {
    if (prices.length < 2) {
        return 0;
    }

    let minPrice = prices[0];
    let profit = 0;
    for (let index = 1; index < prices.length; index++) {
        const price = prices[index];
        const profitIfSoldToday = price - minPrice;
        if (profitIfSoldToday > profit) {
            profit = profitIfSoldToday;
        }

        if (price < minPrice) {
            minPrice = price;
        }
    }

    return profit;
}

export function runTests(): void {
    const inputs = [
        [7, 1, 5, 3, 6, 4], // 5
        [7, 6, 4, 3, 1], // 0
    ];

    inputs.forEach(input => {
        const output = maxProfit(input);
        console.log(output);
    });
}
