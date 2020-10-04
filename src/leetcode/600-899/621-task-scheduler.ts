// Time O(n)
// Space O(n)
function leastInterval(tasks: string[], n: number): number {
    if (n === 0) {
        return tasks.length;
    }

    if (tasks.length === 1) {
        return 1;
    }

    let remainingTaskInstances: { [key: string]: number } = {};
    // O(n) time and space
    for (let i = 0; i < tasks.length; i += 1) {
        const key = tasks[i];
        const count = (remainingTaskInstances[key] ?? 0) + 1;
        remainingTaskInstances[key] = count;
    }

    let requiredIdles = 0;
    // sort non-increasing order
    const taskList = Object.keys(remainingTaskInstances)
        .sort((a, b) => remainingTaskInstances[b] - remainingTaskInstances[a]);
    let currentTaskIndex = 0;
    let slotsRemaining = n + 1;
    let currentTask: string;
    let hasRemovedTask = false;
    let taskOrder = ''; // debug
    let extraSlotsUsed = 0;

    // O(n) space because we only evaluate each element once
    while (taskList.length > 0) {
        if (currentTaskIndex > taskList.length - 1) {
            // no more tasks can fill this gap
            requiredIdles += slotsRemaining;
            taskOrder += Array(slotsRemaining).fill('*').join(''); // debug
            slotsRemaining = n + 1;
            currentTaskIndex = 0;
        }

        currentTask = taskList[currentTaskIndex];
        taskOrder += currentTask; // debug
        remainingTaskInstances[currentTask] -= 1;
        if (remainingTaskInstances[currentTask] === 0) {
            taskList.splice(currentTaskIndex, 1);
            hasRemovedTask = true;
        }

        if (slotsRemaining === 0) {
            extraSlotsUsed += 1;
        }
        // Use the current task
        slotsRemaining = Math.max(slotsRemaining - 1, 0);
        if (!hasRemovedTask) {
            currentTaskIndex += 1;
        }

        hasRemovedTask = false;
    }
    // console.log(taskOrder); // debug

    // e >= r; don't count idles, aka r = 0
    // e < r; offset idles with extras
    requiredIdles = Math.max(requiredIdles - extraSlotsUsed, 0);
    return requiredIdles + tasks.length;
}

export function runTests(): void {
    const inputs = [
        [['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'D', 'D', 'E'], 2], // 12
        [['A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'C', 'C', 'C', 'C', 'D', 'D', 'D', 'D', 'E', 'F'], 4], // 19
        [['A', 'B', 'C', 'D', 'E'], 4], // 5
        [['A', 'B', 'C', 'A', 'B', 'C', 'D', 'A'], 3], // 9
        [['A'], 0], // 1
        [['A'], 1], // 1
        [['A'], 3], // 1
        [['A', 'A'], 0], // 2
        [['A', 'A'], 1], // 3
        [['A', 'A'], 3], // 5
        [['A', 'B'], 0], // 2
        [['A', 'B'], 1], // 2
        [['A', 'B'], 6], // 2
        [['A', 'A', 'A', 'B', 'B', 'B'], 2], // 8
        [['A', 'A', 'A', 'B', 'B', 'B'], 0], // 6
        [['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], 2], //16
    ];

    inputs.forEach(input => {
        const output = leastInterval(input[0] as string[], input[1] as number);
        console.log(output);
    });
}
