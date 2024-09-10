import { pause } from '../utils/pause';
import { AlgorithmFunction } from './types';

export const selectionSort: AlgorithmFunction = async ({
  array,
  updateUI,
  history,
  player,
}) => {
  for (let i = 0; i < array.length; i++) {
    let indexMin = i;
    updateUI(array, { pivotIndex: indexMin });

    for (let j = i + 1; j < array.length; j++) {
      await pause({ history, player });
      updateUI(array, { activeIndex: indexMin, compareIndex: j });
      if (array[j] < array[indexMin]) {
        indexMin = j;
      }
    }
    let tmp = array[i];
    array[i] = array[indexMin];
    array[indexMin] = tmp;

    updateUI(array, { sortedIndices: [i] });
  }
};
