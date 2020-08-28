// A faro shuffle involves splitting a deck of cards into equal halves and interleaving them so that every other
// card is from a different half. The top card of the top half should always be on top. If there are an odd
// number of cards, the top half receives the extra card.

function sameAsOriginal(original: Array<number>, candidate: Array<number>): boolean {
    return candidate.every((value, index) => value === original[index]);
}

function doFaroShuffle(values: Array<number>) {
    const shuffled = [];
    const hasOddNumberOfCards = values.length % 2 === 1;
    const halfwayPointAdjustment = hasOddNumberOfCards ? 1 : 0;
    const lastIndex = Math.floor(values.length / 2) + halfwayPointAdjustment;

    for (let i = 0; i < lastIndex; i += 1) {
        let index = i * 2;
        shuffled[index] = values[i];
        shuffled[index + 1] = values[i + lastIndex];
    }

    if (hasOddNumberOfCards) {
        shuffled.pop();
    }

    return shuffled;
}

function printIterations(original: Array<number>) {
    console.log(original);

    let isSame = false;
    let shuffled = original;
    let iterations = 0;
    while (!isSame) {
        shuffled = doFaroShuffle(shuffled);
        iterations += 1;
        console.log(shuffled);
        isSame = sameAsOriginal(original, shuffled);
    }
    console.log('iterations: ' + iterations);
}
