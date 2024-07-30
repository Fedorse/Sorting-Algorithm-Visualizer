
import { sleep } from "../../utils/sleep";




const partition = async (arr, start, end, setActiveIndex, setArray, setCompareIndex, setPivotIndex, cancelSort, speed) => {
    const pivotElement = arr[end];
    let partitionIndex = start; 
    setActiveIndex(end);
    setPivotIndex(partitionIndex)
    await sleep(500, speed.current);



    for (let i = start; i < end; i++) {
        if(cancelSort.current) return undefined
        setCompareIndex(i);
        await sleep(200, speed.current);

        if (arr[i] < pivotElement) {
            [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
            setArray([...arr]);
            await sleep(20, speed.current);
            partitionIndex++;
        }
    }

    [arr[partitionIndex], arr[end]] = [arr[end], arr[partitionIndex]];
    setArray([...arr]);
    await sleep(50, speed.current);

    return partitionIndex;
};

const quickSortRecursive = async (arr, start, end, setActiveIndex, setArray, setCompareIndex, setPivotIndex,cancelSort,speed) => {
    if (start >= end) {
        return;
    }
    if(cancelSort.current) return undefined

    const index = await partition(arr, start, end, setActiveIndex, setArray, setCompareIndex, setPivotIndex,cancelSort, speed);

    await quickSortRecursive(arr, start, index - 1, setActiveIndex, setArray, setCompareIndex, setPivotIndex, cancelSort, speed);
    await quickSortRecursive(arr, index + 1, end, setActiveIndex, setArray, setCompareIndex, setPivotIndex,cancelSort, speed);
};

export const quickSort = async (array, setActiveIndex, setArray, setCompareIndex, setPivotIndex, cancelSort, speed) => {
    await quickSortRecursive(array, 0, array.length -1, setActiveIndex, setArray, setCompareIndex, setPivotIndex, cancelSort, speed);

    setActiveIndex(null);
    setCompareIndex(null);
    setPivotIndex(null);

    return array;
};
