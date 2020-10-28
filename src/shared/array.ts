export function swapValues(array: number[], index1: number, index2: number): number[] {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;

    return array;
}
