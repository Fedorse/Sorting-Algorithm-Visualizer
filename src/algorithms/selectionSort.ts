import { pause } from '../utils/pause';
import { AlgorithmFunction } from './types';

export const selectionSort: AlgorithmFunction = async ({
  array,
  updateArray,
  updateTracking,
  history,
  player,
}) => {
  for (let i = 0; i < array.length; i++) {
    let indexMin = i;
    for (let j = i + 1; j < array.length; j++) {
      await pause({ history, player });
      updateTracking({ activeIndex: indexMin, compareIndex: j });
      if (array[j] < array[indexMin]) {
        indexMin = j;
      }
    }

    let tmp = array[i];
    array[i] = array[indexMin];
    array[indexMin] = tmp;

    updateArray(array);
  }
};
