import { sleep } from "../../utils/sleep";

export const selectionSort = async (array, setArray, setActiveIndex, setCompareIndex, cancelSort,speed) => {
    let arr = [...array];
    let count = 0;

    for (let i = 0; i < arr.length; i++) { 
        if(cancelSort.current) return undefined
        
        let indexMin = i;
        setActiveIndex(indexMin);

        for (let j = i + 1; j < arr.length; j++) {
            if(cancelSort.current) return undefined
            
            setCompareIndex(j);
            await sleep(50,speed.current); // Задержка для визуализации сравнения

            if (arr[j] < arr[indexMin]) {
                indexMin = j;
                setActiveIndex(indexMin);
            }
            count += 1;
        }

        // Обмен элементов
        let tmp = arr[i];
        arr[i] = arr[indexMin];
        arr[indexMin] = tmp;
        setArray([...arr]);

        await sleep(200,speed.current); // Задержка для визуализации обмена
        setCompareIndex(null); 
    }

    setActiveIndex(null); // Сброс активного индекса после завершения сортировки
    setCompareIndex(null); // Сброс индекса сравнения после завершения сортировки
    return arr

};
