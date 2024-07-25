// import { sleep } from "../../utils/sleep";

// export const quickSort = async (array, setActiveIndex, setArray, setCompareIndex, setPivotIndex) => {
//     // Функция для рекурсивной сортировки
//     const quickSortRecursive = async (arr) => {
//         if (arr.length <= 1) {
//             return arr;
//         }

//         let pivotIndex = Math.floor(arr.length / 2);
//         let pivot = arr[pivotIndex];
//         let less = [];
//         let greater = [];

//         // Устанавливаем индекс опорного элемента
//         setPivotIndex(pivotIndex);
//         await sleep(20);

//         for (let i = 0; i < arr.length; i++) {
//             setActiveIndex(i);
//             await sleep(20);

//             if (i === pivotIndex) continue;

//             setCompareIndex(i);
//             await sleep(20);

//             if (arr[i] < pivot) {
//                 less.push(arr[i]);
//             } else {
//                 greater.push(arr[i]);
//             }

//             // Обновляем массив для визуализации
//             setArray([...less, pivot, ...greater]);
//             await sleep(20);
//         }

//         // Рекурсивная сортировка подмассивов
//         less = await quickSortRecursive(less);
//         greater = await quickSortRecursive(greater);

//         const sortedArray = [...less, pivot, ...greater];
        
//         // Обновляем массив для визуализации
//         setArray(sortedArray);
//         await sleep(20);

//         return sortedArray;
//     };

//     // Запуск рекурсивной сортировки
//     const sortedArray = await quickSortRecursive(array);

//     // Сбрасываем индексы после завершения сортировки
//     setActiveIndex(null);
//     setCompareIndex(null);
//     setPivotIndex(null);

//     return sortedArray;
// };


import { sleep } from "../../utils/sleep";




const partition = async (arr, start, end, setActiveIndex, setArray, setCompareIndex, setPivotIndex, cancelSort) => {
    const pivotElement = arr[end];
    let partitionIndex = start; 
    setActiveIndex(end);
    setPivotIndex(partitionIndex)
    await sleep(500);



    for (let i = start; i < end; i++) {
        if(cancelSort.current) return undefined
        setCompareIndex(i);
        await sleep(200);

        if (arr[i] < pivotElement) {
            [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
            setArray([...arr]);
            await sleep(20);
            partitionIndex++;
        }
    }

    [arr[partitionIndex], arr[end]] = [arr[end], arr[partitionIndex]];
    setArray([...arr]);
    await sleep(50);

    return partitionIndex;
};

const quickSortRecursive = async (arr, start, end, setActiveIndex, setArray, setCompareIndex, setPivotIndex,cancelSort) => {
    if (start >= end) {
        return;
    }
    if(cancelSort.current) return undefined

    const index = await partition(arr, start, end, setActiveIndex, setArray, setCompareIndex, setPivotIndex,cancelSort);

    await quickSortRecursive(arr, start, index - 1, setActiveIndex, setArray, setCompareIndex, setPivotIndex, cancelSort);
    await quickSortRecursive(arr, index + 1, end, setActiveIndex, setArray, setCompareIndex, setPivotIndex,cancelSort);
};

export const quickSort = async (array, setActiveIndex, setArray, setCompareIndex, setPivotIndex, cancelSort) => {
    await quickSortRecursive(array, 0, array.length -1, setActiveIndex, setArray, setCompareIndex, setPivotIndex, cancelSort);

    setActiveIndex(null);
    setCompareIndex(null);
    setPivotIndex(null);

    return array;
};
