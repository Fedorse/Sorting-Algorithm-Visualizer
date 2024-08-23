import { pause } from '../utils/pause';

export const insertionSort = async ({
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
    updateTracking({ activeIndex: i, compareIndex: j });

    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = temp;
    updateArray(array);
  }
};
