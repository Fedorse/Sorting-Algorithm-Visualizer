import { AlgorithmHistory, Player } from '../hooks';
import { Tracking } from '../hooks';
import { pause } from '../utils/pause';
import { AlgorithmFunction } from './types';

type PartitonArg = {
  arr: number[];
  start: number;
  end: number;
  updateArray: (array: number[]) => void;
  updateTracking: (tracking: Tracking) => void;
  history: AlgorithmHistory['historyRef'];
  player: Player['playerRef'];
};

const partition = async ({
  arr,
  start,
  end,
  updateArray,
  updateTracking,
  history,
  player,
}: PartitonArg): Promise<number> => {
  const pivotElement = arr[end];
  let partitionIndex = start;

  for (let i = start; i < end; i++) {
    updateTracking({ pivotIndex: end });

    if (arr[i] < pivotElement) {
      updateTracking({
        activeIndex: i,
        compareIndex: partitionIndex,
      });

      [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
      await pause({ history, player });

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
}: PartitonArg): Promise<void> => {
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

export const quickSort: AlgorithmFunction = async ({
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
