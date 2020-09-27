function strongPasswordChecker(s: string): number {
    let additionsNeeded = 0;
    let removalsNeeded = 0;
    let missingChars = 0;

    const containsLowercase = /[a-z]{1,}/g.test(s);
    if (!containsLowercase) {
        missingChars += 1;
    }

    const containsUppercase = /[A-Z]{1,}/g.test(s);
    if (!containsUppercase) {
        missingChars += 1;
    }

    const containsDigit = /[0-9]{1,}/g.test(s);
    if (!containsDigit) {
        missingChars += 1;
    }

    if (s.length < 6) {
        additionsNeeded = 6 - s.length;
    }

    if (s.length > 20) {
        removalsNeeded += s.length - 20;
    }

    let sequencesNeedingReplacements = (s.match(/(.)\1{2,}/g) || []);
    let editsNeeded = 0;
    if (additionsNeeded > 0) {
        editsNeeded = sequencesNeedingReplacements.reduce((acc, sequence) => {
            return acc + Math.floor(sequence.length / 3);
        }, 0);

        return Math.max(editsNeeded, missingChars, additionsNeeded);
    }
    else if (removalsNeeded > 0) {
        let removalsUsed = 0;
        let index = sequencesNeedingReplacements.length - 1;

        while (removalsNeeded > removalsUsed && sequencesNeedingReplacements.length > 0) {
            const sequence = sequencesNeedingReplacements[index];
            const availableRemovals = removalsNeeded - removalsUsed;

            if ((sequence.length - 2) % 3 === 1) {
                removalsUsed += 1;
                sequencesNeedingReplacements[index] = sequence.slice(0, -1);
            }
            else if ((sequence.length - 2) % 3 === 2 && availableRemovals > 1) {
                removalsUsed += 2;
                sequencesNeedingReplacements[index] = sequence.slice(0, -2);
            }
            else if ((sequence.length - 2) % 3 === 0 && availableRemovals > 2) {
                removalsUsed += 3;
                sequencesNeedingReplacements[index] = sequence.slice(0, -3);
            }
            else {
                // If there are not enough remove ops to perform an efficient removal
                // then they have been used to maximum efficiency on the repeated
                // sequences. The remainders can be used anywhere because they will not
                // affect available edits
                removalsUsed = removalsNeeded;
            }

            index--;
            if (index < 0) {
                index = sequencesNeedingReplacements.length - 1;
            }
        }

        editsNeeded = sequencesNeedingReplacements.reduce((acc, sequence) => {
            return acc + Math.floor(sequence.length / 3);
        }, 0);

        return removalsNeeded + Math.max(missingChars, editsNeeded);
    }
    else {
        editsNeeded = sequencesNeedingReplacements.reduce((acc, sequence) => {
            return acc + Math.floor(sequence.length / 3);
        }, 0);

        return Math.max(missingChars, editsNeeded);
    }
}
