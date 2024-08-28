import { pause } from '../utils/pause';
import { AlgorithmFunction } from './types';

export const insertionSort: AlgorithmFunction = async ({
  array,
  updateArray,
  updateTracking,
  history,
  player,
}) => {
  for (let i = 1; i < array.length; i++) {
    const temp = array[i];
    let j = i - 1;

    await pause({ history, player });
    updateTracking({ activeIndex: i + 1 });

    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j];
      updateTracking({ activeIndex: i, compareIndex: j });
      await pause({ history, player });
      j--;
    }
    array[j + 1] = temp;
    updateArray(array);
    updateTracking({ sortedIndices: [i - 1] });
  }
};
