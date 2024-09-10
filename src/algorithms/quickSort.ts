import { pause } from '../utils/pause';
import { AlgorithmArgs, AlgorithmFunction } from './types';

type PartitionArg = {
  array: number[];
  start: number;
  end: number;
} & AlgorithmArgs;

const partition = async ({
  array,
  start,
  end,
  updateUI,
  history,
  player,
}: PartitionArg): Promise<number> => {
  const pivotElement = array[end];
  let partitionIndex = start;

  for (let i = start; i < end; i++) {
    updateUI(array, { pivotIndex: end });

    if (array[i] < pivotElement) {
      updateUI(array, {
        activeIndex: i,
        compareIndex: partitionIndex,
      });

      [array[i], array[partitionIndex]] = [array[partitionIndex], array[i]];
      await pause({ history, player });

      partitionIndex++;
    }
  }

  [array[partitionIndex], array[end]] = [array[end], array[partitionIndex]];
  updateUI(array);

  return partitionIndex;
};

const quickSortRecursive = async ({
  array,
  start,
  end,
  updateUI,
  history,
  player,
}: PartitionArg): Promise<void> => {
  if (start >= end) {
    return;
  }
  await pause({ history, player });

  const index = await partition({
    array,
    start,
    end,
    updateUI,
    history,
    player,
  });

  updateUI(array, { sortedIndices: [index] });

  await quickSortRecursive({
    array,
    start,
    end: index - 1,
    updateUI,
    history,
    player,
  });

  await quickSortRecursive({
    array,
    start: index + 1,
    end,
    updateUI,
    history,
    player,
  });
};

export const quickSort: AlgorithmFunction = async ({
  array,
  updateUI,
  history,
  player,
}) => {
  await quickSortRecursive({
    array,
    start: 0,
    end: array.length - 1,
    updateUI,
    history,
    player,
  });
  updateUI(array, { sortedIndices: array.map((_, idx) => idx) });

  return array;
};
