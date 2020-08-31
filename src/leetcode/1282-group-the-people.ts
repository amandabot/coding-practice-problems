function groupThePeople(groupSizes: number[]): number[][] {
    const groupMap = new Map<number, number[]>();
    const foundGroups: number[][] = [];

    groupSizes.forEach((member, index) => {
        let members = groupMap.get(member) ?? [];
        members.push(index);

        if(members.length === member){
            foundGroups.push(members);
            members = [];
        }

        groupMap.set(member, members);
    });
    
    return foundGroups;
}

export function runTests(): void {
    const inputs = [
        [1,2,3,4],
        [1,1,1,1,1],
        [3,1,2,10,1]
    ];
    
    inputs.forEach(input =>{
        const output = groupThePeople(input);
        console.log(output);
    });
}
