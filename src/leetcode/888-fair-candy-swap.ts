function fairCandySwap(A: number[], B: number[]): number[] {
    const totalCandyA = A.reduce((acc, num) => acc + num, 0);
    const totalCandyB = B.reduce((acc, num) => acc + num, 0);
    
    const difference = (totalCandyA - totalCandyB) / 2;
    const candyToTradeFromA = A.find(candy => B.includes(candy - difference)) || 0;
    const candyToTradeFromB = B.find(candy =>  candy === candyToTradeFromA - difference) || 0;
    return [candyToTradeFromA, candyToTradeFromB]
}
