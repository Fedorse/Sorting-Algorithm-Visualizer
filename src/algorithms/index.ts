import { bubbleSort } from './bubbleSort';
import { insertionSort } from './insertionSort';
import { selectionSort } from './selectionSort';
import { quickSort } from './quickSort';

export const algorithms = {
  bubble: bubbleSort,
  insertion: insertionSort,
  selection: selectionSort,
  quick: quickSort,
} as const;

export type AlgorithmKeys = keyof typeof algorithms;

export const algorithmNames = Object.keys(algorithms) as Array<AlgorithmKeys>;
