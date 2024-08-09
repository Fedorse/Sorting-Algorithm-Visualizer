import { sleep } from '../../utils/sleep';
import { pause } from '../../utils/pause';

export const insertionSort = async (
  array,
  setArray,
  setActiveIndex,
  setCompareIndex,
  evalStateRef,
  speedRef,
  updateHistory,
) => {
  let arr = [...array];
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i];
    let j = i - 1;

    await pause(evalStateRef);
    if (evalStateRef.current === 'notStarted') {
      throw new Error('cancelSort');
    }
    setActiveIndex(i);
    await sleep(100, speed.current);
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
      setCompareIndex(j);
      await sleep(100, speedRef.current);
    }
    arr[j + 1] = temp;
    await sleep(100, speedRef.current);
    updateHistory({
      array: [...arr],
    });
    setArray([...arr]);
  }
  setActiveIndex(null);
  setCompareIndex(null);
};
