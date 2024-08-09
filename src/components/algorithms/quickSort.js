import { sleep } from '../../utils/sleep';
import { pause } from '../../utils/pause';

const partition = async (
  arr,
  start,
  end,
  setActiveIndex,
  setArray,
  setCompareIndex,
  setPivotIndex,
  evalStateRef,
  speedRef,
  updateHistory,
) => {
  const pivotElement = arr[end];
  let partitionIndex = start;
  setActiveIndex(end);
  setPivotIndex(partitionIndex);
  await sleep(100, speedRef.current);

  for (let i = start; i < end; i++) {
    await pause(evalStateRef);
    if (evalStateRef === 'notStarted') {
      throw new Error('cancelSort');
    }
    setCompareIndex(i);
    await sleep(100, speedRef.current);

    if (arr[i] < pivotElement) {
      [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
      updateHistory({
        array: [...arr],
      });
      setArray([...arr]);
      await sleep(20, speedRef.current);
      partitionIndex++;
    }
  }

  [arr[partitionIndex], arr[end]] = [arr[end], arr[partitionIndex]];
  updateHistory({
    array: [...arr],
  });
  setArray([...arr]);
  await sleep(50, speedRef.current);

  return partitionIndex;
};

const quickSortRecursive = async (
  arr,
  start,
  end,
  setActiveIndex,
  setArray,
  setCompareIndex,
  setPivotIndex,
  evalStateRef,
  speedRef,
  updateHistory,
) => {
  if (start >= end) {
    return;
  }
  await pause(evalStateRef);
  if (evalStateRef === 'notStarted') {
    throw new Error('cancelSort');
  }

  const index = await partition(
    arr,
    start,
    end,
    setActiveIndex,
    setArray,
    setCompareIndex,
    setPivotIndex,
    evalStateRef,
    speedRef,
    updateHistory,
  );

  await quickSortRecursive(
    arr,
    start,
    index - 1,
    setActiveIndex,
    setArray,
    setCompareIndex,
    setPivotIndex,
    evalStateRef,
    speedRef,
    updateHistory,
  );
  await quickSortRecursive(
    arr,
    index + 1,
    end,
    setActiveIndex,
    setArray,
    setCompareIndex,
    setPivotIndex,
    evalStateRef,
    speedRef,
    updateHistory,
  );
};

export const quickSort = async (
  array,
  setActiveIndex,
  setArray,
  setCompareIndex,
  setPivotIndex,
  evalStateRef,
  speedRef,
  updateHistory,
) => {
  await quickSortRecursive(
    array,
    0,
    array.length - 1,
    setActiveIndex,
    setArray,
    setCompareIndex,
    setPivotIndex,
    evalStateRef,
    speedRef,
    updateHistory,
  );

  setActiveIndex(null);
  setCompareIndex(null);
  setPivotIndex(null);

  return array;
};
