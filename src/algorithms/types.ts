import type { Player } from '../hooks/usePlayer';
import type { AlgorithmHistory, Tracking } from '../hooks/useAlgorithm';

export type AlgorithmFunction = (args: {
  array: number[];
  updateArray: (array: number[]) => void;
  updateTracking: (tracking: Tracking) => void;
  history: AlgorithmHistory['historyRef'];
  player: Player['playerRef'];
}) => Promise<void | number[]>;
