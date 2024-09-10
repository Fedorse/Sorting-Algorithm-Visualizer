import { useCallback, useState } from 'react';
import { generateRandomArray } from '../utils/generateRandomArray';
import { algorithms } from '../algorithms';
import type { AlgorithmKeys } from '../algorithms';
import type { Player } from './usePlayer';
import type { History } from './useHistory';

export type AlgorithmState = 'notStarted' | 'started' | 'finished';

export type Tracking = {
  activeIndex: number | null;
  compareIndex: number | null;
  pivotIndex: number | null;
  sortedIndices: number[];
};

export type AlgorithmHistory = History<{ tracking: Tracking; array: number[] }>;

export const useAlgorithm = ({
  history,
  player,
}: {
  history: AlgorithmHistory;
  player: Player;
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmKeys>('bubble');
  const [algorithmState, setAlgorithmState] =
    useState<AlgorithmState>('notStarted');
  const [array, setArray] = useState(generateRandomArray(10, 370, 900));

  const [tracking, setTracking] = useState<Tracking>({
    activeIndex: null,
    compareIndex: null,
    pivotIndex: null,
    sortedIndices: [],
  });

  const resetAndInitAlgorithm = useCallback(
    (newLength?: number) => {
      const length = newLength ?? array.length;
      setArray(generateRandomArray(length, 370, 900));
      setAlgorithmState('notStarted');
      setTracking({
        activeIndex: null,
        compareIndex: null,
        pivotIndex: null,
        sortedIndices: [],
      });
    },
    [setArray, setAlgorithmState, setTracking],
  );

  const resetAll = useCallback(
    (newLength?: number) => {
      resetAndInitAlgorithm(newLength);
      history.resetHistory();
      player.setPlayerState(null);
    },
    [resetAndInitAlgorithm, history, player],
  );

  const updateUI = useCallback(
    (newArray: number[], newTracking: Partial<Tracking> = {}) => {
      setArray([...newArray]);
      setTracking((current) => {
        const nextTracking = {
          ...current,
          ...newTracking,
          sortedIndices: [
            ...current.sortedIndices,
            ...(newTracking.sortedIndices || []),
          ],
        };

        history.updateHistory({ array: [...newArray], tracking: nextTracking });

        return nextTracking;
      });
    },
    [setArray, setTracking, history],
  );

  const selectAlgorithm = useCallback(
    (name: AlgorithmKeys) => {
      if (algorithmState === 'notStarted') {
        setSelectedAlgorithm(name);
        return;
      }
      resetAll(array.length);
      setSelectedAlgorithm(name);
    },
    [setSelectedAlgorithm, resetAll],
  );

  const runAlgorithm = useCallback(async () => {
    const { playerRef, setPlayerState } = player;
    const { historyRef } = history;

    setPlayerState('play');
    setAlgorithmState('started');
    const algorithm = algorithms[selectedAlgorithm];

    await algorithm({
      array,
      updateUI,
      history: historyRef,
      player: playerRef,
    });
    setTracking((current) => ({
      ...current,
      activeIndex: null,
      compareIndex: null,
      pivotIndex: null,
    }));
    setAlgorithmState('finished');
  }, [selectedAlgorithm, array, history, player, setAlgorithmState, updateUI]);

  const getCurrentStep = useCallback(() => {
    const { getCurrentHistoryItem } = history;
    const { playerState } = player;

    if (!playerState || playerState === 'play') {
      return { array, tracking };
    } else {
      return getCurrentHistoryItem();
    }
  }, [array, tracking, history, player]);

  return {
    array,
    selectedAlgorithm,
    algorithmState,
    selectAlgorithm,
    resetAll,
    runAlgorithm,
    getCurrentStep,
  };
};
