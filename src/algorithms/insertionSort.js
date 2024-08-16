import { sleep } from '../../utils/sleep';
import { pause } from '../../utils/pause';

export const insertionSort = async (
  array,
  updateArray,
  setActiveIndex,
  setCompareIndex,
  evalStateRef,
speedRef,
playerStateRef,
trackRef,
) => {
  let arr = [...array];
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i];
    let j = i - 1;

    await pause(evalStateRef, playerStateRef, trackRef, speedRef);
    if (evalStateRef.current === 'notStarted') {
      throw new Error('cancelSort');
    }
    setActiveIndex(i);
    updateArray([...arr], i, null, null);

    await sleep(100, speed.current);
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
      setCompareIndex(j);
      updateArray([...arr], null, j, null);
      await sleep(100, speedRef.current);
    }
    arr[j + 1] = temp;
    await sleep(100, speedRef.current);
    updateArray([...arr], temp, null, null);
  }
  setActiveIndex(null);
  setCompareIndex(null);
};
