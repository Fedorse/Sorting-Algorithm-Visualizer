import { sleep } from "../../utils/sleep";
import { pause } from "../../utils/pause";

export const selectionSort = async (array, setArray, setActiveIndex, setCompareIndex, evalStateRef, speedRef) => {
    let arr = [...array];
    let count = 0;

    for (let i = 0; i < arr.length; i++) { 
        let indexMin = i;
        setActiveIndex(indexMin);
        for (let j = i + 1; j < arr.length; j++) {

            await pause(evalStateRef)
            if(evalStateRef.current === 'notStarted'){
                throw new Error('cancelSort')
                
            }
            setCompareIndex(j);
            await sleep(100,speedRef.current); // Задержка для визуализации сравнения

            if (arr[j] < arr[indexMin]) {
                indexMin = j;
                setActiveIndex(indexMin);
            }
            count += 1;
        }

        let tmp = arr[i];
        arr[i] = arr[indexMin];
        arr[indexMin] = tmp;
        setArray([...arr]);

        await sleep(100,speedRef.current); // Задержка для визуализации обмена
        setCompareIndex(null); 
    }

};
