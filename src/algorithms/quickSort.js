import { pause } from '../utils/pause';

const partition = async ({
  arr,
  start,
  end,
  updateArray,
  updateTracking,
  history,
  player,
}) => {
  const pivotElement = arr[end];
  let partitionIndex = start;

  for (let i = start; i < end; i++) {
    await pause({ history, player });
    updateTracking({ activeIndex: partitionIndex, pivotIndex: end });

    if (arr[i] < pivotElement) {
      [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];

      partitionIndex++;
    }
  }

  [arr[partitionIndex], arr[end]] = [arr[end], arr[partitionIndex]];
  updateArray(arr);

  return partitionIndex;
};

const quickSortRecursive = async ({
  arr,
  start,
  end,
  updateArray,
  updateTracking,
  history,
  player,
}) => {
  if (start >= end) {
    return;
  }
  await pause({ history, player });

  const index = await partition({
    arr,
    start,
    end,
    updateArray,
    updateTracking,
    history,
    player,
  });

  await quickSortRecursive({
    arr,
    start,
    end: index - 1,
    updateArray,
    updateTracking,
    history,
    player,
  });
  await quickSortRecursive({
    arr,
    start: index + 1,
    end,
    updateArray,
    updateTracking,
    history,
    player,
  });
};

export const quickSort = async ({
  array,
  updateArray,
  updateTracking,
  history,
  player,
}) => {
  await quickSortRecursive({
    arr: array,
    start: 0,
    end: array.length - 1,
    updateArray,
    updateTracking,
    history,
    player,
  });
  return array;
};
