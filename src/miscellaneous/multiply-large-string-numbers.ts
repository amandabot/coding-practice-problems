// Time O(n * m)
// Space O(n * m)
// O(n * m) where n and m are the number of digits in each number or
// O(log10(n) * log10(m)) where n and m are the actual values
// floor(log10(n)) + 1 will give you the number of digits in a decimal integer

// Assume strings are non-null and non-empty, and represent positive integers
// Challenge: handle negative numbers
// given two string numbers, return a string representing their product
// without using Number.parseInt()
function multiplyStringifiedNumbers(number1: string, number2: string): string {
    // Space O(n * m)
    const results = [];

    const indexOffset = number1.length + number2.length - 2;
    // Time O(n * m)
    // We have to start at the end of the string since the rightmost value is the smallest
    for (let index1 = number1.length - 1; index1 >= 0; index1--) {
        const digitOne = Number.parseInt(number1[index1], 10);

        for (let index2 = number2.length - 1; index2 >= 0; index2--) {
            const digitTwo = Number.parseInt(number2[index2], 10);
            const result = digitOne * digitTwo;
            const powerOfTen = indexOffset - (index1 + index2);
            results[powerOfTen] = (results[powerOfTen] || 0) + result;
        }
    }

    // Time O(n) - iterate through each element once
    for (let index = 0; index < results.length; index++) {
        let remainder = results[index];
        // The value for this power of ten is included in remainder,
        // so we can clear the value and treat it like an overflow
        results[index] = 0;
        let powerOfTenIndex = index;

        while (remainder > 0) {
            const valueForThisPowerOfTen = remainder % 10;
            results[powerOfTenIndex] = (results[powerOfTenIndex] || 0) + valueForThisPowerOfTen;
            remainder = Math.floor(remainder / 10);
            powerOfTenIndex++;
        }
    }

    // Time O(n)
    return results.reverse().join('');
}


// approach 2: you can calculate each power of 10 place at a time.
/*
    both the top and bottom N start at 0
    Iteration
    - the n starting position for the top is the 10^n position you are calculating for
    - calculate that position, and decrement the top N; increment the bottom N
    - when either the top number reaches the 1s place or the bottom number reaches the highest digit,
        stop the current iteration
        - move the top number to the 10 ^ (n+1) position and reset the bottom at 10^0
    - when you have no more numbers to iterate backward from on the top number, move the bottom digit start point
    to n + 1 and repeat the iterations until the bottom number reaches the first digit and completes those calculations
*/
function alternateApproach(number1: string, number2: string): string {
    // // Space O(n * m)
    // const results = [];
    // const topNumber = number1.split(/|/).reverse();
    // const bottomNumber = number2.split(/|/).reverse();

    // const indexOffset = number1.length + number2.length - 2;
    // // Time O(n * m)
    // // We have to start at the end of the string since the rightmost value is the smallest
    // for (let bottomStartIndex = 0; bottomStartIndex < number1.length; bottomStartIndex++) {
    //     let topStart = number2.length - 1;
    //     let topIndex = number2.length - 1;
    //     let bottomIndex = bottomStartIndex;

    //     while (topIndex > 0) {
    //         const powerOfTen = indexOffset - (bottomStartIndex + index2);
    //     }
    //     const digitOne = Number.parseInt(number1[bottomStartIndex], 10);

    //     for (let index2 = number2.length - 1; index2 >= 0; index2--) {
    //         const digitTwo = Number.parseInt(number2[index2], 10);
    //         const result = digitOne * digitTwo;
    //         const powerOfTen = indexOffset - (bottomStartIndex + index2);
    //         results[powerOfTen] = (results[powerOfTen] || 0) + result;
    //     }
    // }

    // // Time O(n) - iterate through each element once
    // for (let index = 0; index < results.length; index++) {
    //     let remainder = results[index];
    //     // The value for this power of ten is included in remainder,
    //     // so we can clear the value and treat it like an overflow
    //     results[index] = 0;
    //     let powerOfTenIndex = index;

    //     while (remainder > 0) {
    //         const valueForThisPowerOfTen = remainder % 10;
    //         results[powerOfTenIndex] = (results[powerOfTenIndex] || 0) + valueForThisPowerOfTen;
    //         remainder = Math.floor(remainder / 10);
    //         powerOfTenIndex++;
    //     }
    // }

    // // Time O(n)
    // return results.reverse().join('');
    return '';
}

function superEasyVersion(number1: string, number2: string): string {
    return (BigInt(number1) * BigInt(number2)).toString();
}

function generateTestValues(): void {
    const seed = BigInt('123456789012345');
    Array(15).fill(0).forEach(x => {
        const value1 = seed / BigInt(Math.floor(Math.random() * 100));
        const value2 = seed / BigInt(Math.floor(Math.random() * 100));
        const result = value1 * value2;
        console.log(`['${value1}', '${value2}], // '${result}'`);
    });
}

export function runTests(): void {
    const inputs = [
        ['100', '100'], // '10000'
        ['10', '10'], // '100'
        ['1', '1'], // '1'
        ['0', '0'], // '0'
        ['123456', '123456'], // '15241383936'
        ['999', '999'], // '998001'
        ['4', '1000'], // '4000'
        ['4734345', '28467456'], // '134774757976320'
        ['5144032875514', '12345678901234'], // '63506578138487253022984276'
        ['1899335215574', '1624431434372'], // '3085339828588124653309528'
        ['3858024656635', '5878894714873'], // '22680920763741222052632355'
        ['2329373377591', '1991238532457'], // '4638338025938708169971087'
        ['1505570597711', '4748338038936'], // '7148958139414751110475496'
        ['2092487949361', '4115226300411'], // '8611061442503467941487371'
        ['1543209862654', '2805836113916'], // '4329993963985943458093064'
        ['1327492354971', '24691357802469'], // '32777588716631148248223399'
        ['1299545147498', '2519526306374'], // '3274238185441890967552252'
        ['1524157889041', '1419043551866'], // '2162846424469325356500506'
        ['1668334986653', '1313370095876'], // '2191141281373735790343028'
        ['2519526306374', '3631082029774'], // '9148606694617492913979476'
        ['3741114818555', '5367686478797'], // '20081131427184765509678335'
        ['3248862868745', '1738828014258'], // '5649213770656417642566210'
    ];

    inputs.forEach(input => {
        const output = alternateApproach(input[0], input[1]);
        console.log(`${output}`);
    });
}
