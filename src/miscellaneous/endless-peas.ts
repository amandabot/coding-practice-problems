// Calculates how long it would take to exhaust an initial collection if N items are randomly removed
// and replaced with new items

const initialPea = 'I';
const newPea = 'N';
const fullBatchSize = 500;
const servingSize = 50;
const refillThreshold = 60;
const maxServings = 120;
const finalBatchCounts = [];
const iterations = 150;
const shouldLogEachServingResult = false;
const shouldLogEachIterationResult = false;

for (let index = 0; index < iterations; index++) {
    const iterationBatchCount = runSimulation(refillThreshold);
    finalBatchCounts.push(iterationBatchCount);
}

finalBatchCounts.sort((a, b) => a - b);

console.log(`Min count: ${finalBatchCounts[0]}; Max count: ${finalBatchCounts[iterations - 1]}`);
const averageValue = finalBatchCounts.reduce((a, b) => a + b, 0) / finalBatchCounts.length;
console.log(`Average count: ${averageValue}`);

function runSimulation(refillThreshold: number) {
    let batch = new Array(fullBatchSize).fill(initialPea);
    let batchCount = 1;

    if (shouldLogEachServingResult) {
        reportConcentration(batch, batchCount);
    }

    while (areOriginalPeasInBatch(batch) && batchCount < maxServings) {
        batchCount = batchCount + 1;

        const randomizedBatch = batch.sort(() => 0.5 - Math.random());
        const serving = randomizedBatch.slice(0, servingSize);
        batch = randomizedBatch.slice(servingSize);

        const shouldRefill = !refillThreshold || batch.length <= refillThreshold;
        if (shouldRefill) {
            const replacementPeas = new Array(fullBatchSize - batch.length).fill(newPea);
            batch = batch.concat(replacementPeas);
        }

        if (shouldLogEachServingResult) {
            reportConcentration(batch, batchCount);
            reportConcentration(serving, 0);
        }
    }

    if (shouldLogEachIterationResult) {
        const result = batchCount === maxServings ?
            `Reached max serving size` :
            `No more initial peas in batch after ${batchCount} batches.`;
        console.log(result);
    }

    return batchCount;
}

function areOriginalPeasInBatch(batch: Array<string>) {
    return batch.includes(initialPea);
}

function reportConcentration(batch: Array<string>, batchCount: number) {
    const initialPeas = batch.filter(pea => pea === initialPea);
    const newPeas = batch.filter(pea => pea === newPea);
    const initialPeaPercentage = (initialPeas.length / batch.length) * 100;
    const newPeaPercentage = (newPeas.length / batch.length) * 100;
    const prefix = batchCount ? `Batch ${batchCount}` : 'Serving';

    console.log(`${prefix} contains: ${initialPeas.length} Initial Peas, ${newPeas.length} New Peas`);
    console.log(`Concentration: Initial Peas ${initialPeaPercentage.toFixed(2)}% New Peas ${newPeaPercentage.toFixed(2)}%`);
}
