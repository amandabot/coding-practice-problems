function defangIPaddr(address: string): string {
    return address.replace(/\./g, '[.]');
}

export function runTests(): void {
    const inputs = [
        '1.1.1.1',
        '255.100.50.0'
    ];

    inputs.forEach(input => {
        const output = defangIPaddr(input);
        console.log(output);
    });
}
