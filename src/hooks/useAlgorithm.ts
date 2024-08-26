import { useCallback, useState } from 'react';
import { generateRandomArray } from '../utils/generateRandomArray';
import { algorithms } from '../algorithms';
import type { AlgorithmKeys } from '../algorithms';
import type { Player } from './usePlayer';
import type { History } from './useHistory';

export type AlgorithmState = 'notStarted' | 'started' | 'finished';

export type Tracking = Partial<{
    activeIndex: number | null;
    compareIndex: number | null;
    pivotIndex: number | null;
}>;

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
    const [array, setArray] = useState(generateRandomArray(10, 150, 650));
    const [tracking, setTracking] = useState<Tracking>({
        activeIndex: null,
        compareIndex: null,
        pivotIndex: null,
    });

    const resetTracking = useCallback(() => {
        setTracking({
            activeIndex: null,
            compareIndex: null,
            pivotIndex: null,
        });
    }, [setTracking]);

    const resetAlgorithm = useCallback(() => {
        setArray(generateRandomArray(10, 150, 650));
        setAlgorithmState('notStarted');
        resetTracking();
    }, [setArray, setAlgorithmState, resetTracking]);

    const resetAll = useCallback(() => {
        resetAlgorithm();
        history.resetHistory();
        player.setPlayerState(null);
    }, [resetAlgorithm, history, player]);

    const updateArray = useCallback(
        (newArray: number[]) => {
            setArray([...newArray]);
            history.updateHistory({ array: [...newArray], tracking });
        },
        [setArray, history, tracking],
    );

    const updateTracking = useCallback(
        (newTracking: Tracking) => {
            setTracking((current) => {
                const nextTracking = { ...current, ...newTracking };
                history.updateHistory({ array: [...array], tracking: nextTracking });
                return nextTracking;
            });
        },
        [setTracking, history, array, tracking],
    );

    const selectAlgorithm = useCallback(
        (name: AlgorithmKeys) => {
            resetAll();
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
        try {
            await algorithm({
                array,
                updateArray,
                updateTracking,
                history: historyRef,
                player: playerRef,
            });
        } catch (error) {
            console.log('error', error);

            return
        }

        setAlgorithmState('finished');
        resetTracking();
    }, [
        selectedAlgorithm,
        array,
        history,
        player,
        updateArray,
        setAlgorithmState,
        updateTracking,
        resetTracking,
        resetAll
    ]);

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
        resetAlgorithm,
        resetAll,
        runAlgorithm,
        getCurrentStep,
    };
};
