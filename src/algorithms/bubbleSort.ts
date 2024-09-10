import { pause } from '../utils/pause';
import type { AlgorithmFunction } from './types';

export const bubbleSort: AlgorithmFunction = async ({
  array,
  updateUI,
  history,
  player,
}) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      await pause({ history, player });

      updateUI(array, { activeIndex: j, compareIndex: j + 1 });

      if (array[j + 1] < array[j]) {
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
        updateUI(array);
      }
    }
    updateUI(array, { sortedIndices: [array.length - i - 1] });
  }
};
