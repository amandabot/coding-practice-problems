function isNumber(s: string): boolean {
    const sanitizedInput = s.trim();
    const onlyContainsValidCharacters = sanitizedInput.match(/^[-+e.\d]+$/);
    if(!onlyContainsValidCharacters){
        return false;
    }

    const matchesExponentFormat = /^[-+]?\d{0,}(\d|\d[.]|[.]\d)\d{0,}e[-+]?\d+$/g.test(sanitizedInput);
    const matchesNegativeNumber = /^[-]\d{0,}(\d|\d[.]|[.]\d)\d{0,}$/g.test(sanitizedInput);
    const matchesPositiveNumber = /^[+]?\d{0,}(\d|\d[.]|[.]\d)\d{0,}$/g.test(sanitizedInput);

    return matchesExponentFormat ||
        matchesNegativeNumber ||
        matchesPositiveNumber;
}

export function runTests(): void {
    const inputs = [
        '0',
        '+.8',
        ' 0.1 ',
        'abc',
        '1 a',
        '2e10',
        ' -90e3   ',
        ' 1e',
        'e3',
        ' 6e-1',
        ' 99e2.5 ',
        '53.5e93',
        ' --6 ',
        '-+3',
        '95a54e53',
        '.',
        '3.',
        '.1',
        ' 005047e+6'
    ];

    inputs.forEach(input => {
        const output = isNumber(input);
        if(output){
            console.log(`input: ${input}`);
        }
    });
}
