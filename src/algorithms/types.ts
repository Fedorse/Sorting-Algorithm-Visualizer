import type { Player } from '../hooks/usePlayer';
import type { AlgorithmHistory, Tracking } from '../hooks/useAlgorithm';

export type AlgorithmArgs = {
  array: number[];
  updateUI: (array: number[], tracking?: Partial<Tracking>) => void;
  history: AlgorithmHistory['historyRef'];
  player: Player['playerRef'];
};

export type AlgorithmFunction = (
  args: AlgorithmArgs,
) => Promise<void | number[]>;
