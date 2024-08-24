export type AlgorithmState = 'notStarted' | 'started' | 'finished';

export type PlayerState = 'forward' | 'backward' | 'pause' | 'play' | null;

export type Tracking = {
  activeIndex: number | null;
  compareIndex: number | null;
  pivotIndex: number | null;
};
