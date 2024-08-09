import { sleep } from '../../utils/sleep';
import { pause } from '../../utils/pause';

export const selectionSort = async (
  array,
  setArray,
  setActiveIndex,
  setCompareIndex,
  evalStateRef,
  speedRef,
  updateHistory,
) => {
  let arr = [...array];
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    let indexMin = i;
    setActiveIndex(indexMin);
    for (let j = i + 1; j < arr.length; j++) {
      setCompareIndex(j);
      await sleep(100, speedRef.current); // Задержка для визуализации сравнения

      if (arr[j] < arr[indexMin]) {
        indexMin = j;
        setActiveIndex(indexMin);
      }
      count += 1;
    }

    let tmp = arr[i];
    arr[i] = arr[indexMin];
    arr[indexMin] = tmp;

    updateHistory({
      array: [...arr],
    });
    setArray([...arr]);

    await pause(evalStateRef);
    if (evalStateRef.current === 'notStarted') {
      throw new Error('cancelSort');
    }
    await sleep(100, speedRef.current); // Задержка для визуализации обмена
    setCompareIndex(null);
  }
  updateHistory({
    array: [...arr],
  });
  setArray([...arr]);
};
