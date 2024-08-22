import { sleep } from '../../utils/sleep';
import { pause } from '../../utils/pause';

export const bubbleSort = async (
  array,
  updateArray,
  setActiveIndex,
  setCompareIndex,
  speedRef,
  playerStateRef,
  trackRef,
) => {
  let arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      await pause(playerStateRef, trackRef, speedRef);

      if (evalStateRef.current === 'notStarted') {
        throw new Error('cancelSort');
      }

      if (arr[j + 1] < arr[j]) {
        setActiveIndex(j);
        setCompareIndex(j + 1);

        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        updateArray([...arr], j, j + 1, null);
        await sleep(100, speedRef.current);
      }
    }
  }
  setActiveIndex(null);
  setCompareIndex(null);
};
