// Time O(log10(n)) for every power of 10 in the digit, we will require floor(log10(n)) + 1 operations
// Space O(1) - worst number is 27 chars long, but output is constrained to [1,27]
// We will assume the input a positive integer from [1,3999999]
function intToRomanNumeral(input: number): string {
    const conversionTable = new Map<number, string>([
        [1, 'I'],
        [5, 'V'],
        [10, 'X'],
        [50, 'L'],
        [100, 'C'],
        [500, 'D'],
        [1000, 'M'],
        [5000, 'N'],
        [10000, 'H'],
        [50000, 'P'],
        [100000, 'G'],
        [500000, 'F'],
        [1000000, 'S'],
    ]);

    let powerOfTen = 0;
    let unconvertedPieces = input;
    let romanNumeral = '';
    let currentDigit = '';

    while (unconvertedPieces > 0) {
        const value = unconvertedPieces % 10;

        const lowerPowerOfTen = Math.pow(10, powerOfTen);
        const upperPowerOfTen = Math.pow(10, powerOfTen + 1);
        const midwayValue = upperPowerOfTen / 2;

        const lowerPowerOfTenLetter = conversionTable.get(lowerPowerOfTen);
        const upperPowerOfTenLetter = conversionTable.get(upperPowerOfTen);
        const midwayValueLetter = conversionTable.get(midwayValue);

        if (value > 0 && value < 4) {
            currentDigit = lowerPowerOfTenLetter.repeat(value);
        }
        else if (value === 4) {
            currentDigit = `${lowerPowerOfTenLetter}${midwayValueLetter}`;
        }
        else if (value > 4 && value < 9) {
            currentDigit = `${midwayValueLetter}${lowerPowerOfTenLetter.repeat(value - 5)}`;
        }
        else if (value === 9) {
            currentDigit = `${lowerPowerOfTenLetter}${upperPowerOfTenLetter}`;
        }

        romanNumeral = `${currentDigit}${romanNumeral}`;
        unconvertedPieces = Math.floor(unconvertedPieces / 10);
        currentDigit = '';
        powerOfTen += 1;
    }

    return romanNumeral;
}

export function runTests(): void {
    const inputs = [
        1, // I
        2, // II
        3, // III
        4, // IV
        5, // V
        6, // VI
        7, // VII
        8, // VIII
        9, // IX
        10, // X
        20, // XX
        40, // XL
        45, // XLV
        50, // L
        60, // LX
        90, // XC
        95, // XCV
        100, // C
        110, // CX
        150, // CL
        400, // CD
        499, // CDXCIX
        500, // D
        900, // CM
        950, // CML
        995, // CMXCV
        1000, // M
        1111, // MCXI
        1910, // MCMX
        1912, // MCMXII
        2000, // MM
        3999, // MMMCMXCIX
        // Extended numbers
        4000, // MN
        5000, // N
        6000, // NM
        7000, // NMM
        8000, // NMMM
        9000, // MH
        10000, // H
        20000, // HH
        30000, // HHH
        40000, // HP
        50000, // P
        60000, // PH
        70000, // PHH
        80000, // PHHH
        90000, // HG
        90001, // HGI
        100000, // G
        200000, // GG
        300000, // GGG
        400000, // GF
        500000, // F
        600000, // FG
        700000, // FGG
        800000, // FGGG
        900000, // GS
        1000000, // S
        1111111, // SGHMCXI
        3888888, // SSSFGGGPHHHNMMMDCCCLXXXVIII
        3999999, // SSSGSHGMHCMXCIX
    ];

    inputs.forEach(input => {
        const output = intToRomanNumeral(input);
        console.log(`output: ${output}`);
    });
}
