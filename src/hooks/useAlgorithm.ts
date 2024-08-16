import { useCallback, useState } from "react";
import { generateRandomArray } from "../utils/generateRandomArray";
import { algorithms } from "../algorithms";


export const useAlgorithm = ({ history, player }) => {
    const [array, setArray] = useState(generateRandomArray(10, 150, 650));
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
    const [activeIndex, setActiveIndex] = useState(null);
    const [compareIndex, setCompareIndex] = useState(null);
    const [pivotIndex, setPivotIndex] = useState(null);


    const selectAlgorithm = (name) => {
        player.setEvalState('notStarted');
        history.resetHistory();
        resetAlgorithm();
        setSelectedAlgorithm(name);
    }


    const resetAlgorithm = () => {
        player.setEvalState('notStarted');
        history.resetHistory();

        setArray(generateRandomArray(10, 150, 650));
        setActiveIndex(null);
        setCompareIndex(null);
        setPivotIndex(null);
    };

    const resetTracking = () => {
        setActiveIndex(null);
        setCompareIndex(null);
        setPivotIndex(null);
    };

    const updateArray = useCallback((newArray, activeIndex, compareIndex, pivotIndex) => {
        setArray([...newArray]);
        setActiveIndex(activeIndex);
        setCompareIndex(compareIndex);
        setPivotIndex(pivotIndex);

        // console.log('activeIndex, compareIndex, pivotIndex', activeIndex, compareIndex, pivotIndex);


        history.updateHistory({ array: [...newArray], activeIndex, compareIndex, pivotIndex });
    }, [setArray, history, activeIndex, compareIndex, pivotIndex]);

    const runAlgorithm = useCallback(async (name) => {
        player.setEvalState('started');
        const algorithm = algorithms[name];
        await algorithm({
            array,
            updateArray,
            history,
            player,
        })

        setActiveIndex(null);
        setCompareIndex(null);
        setPivotIndex(null);

        player.setEvalState('finished');
    }, [array, updateArray, setActiveIndex, setCompareIndex, history, player]);

    return {
        array,
        selectedAlgorithm,
        activeIndex,
        compareIndex,
        pivotIndex,
        selectAlgorithm,
        resetAlgorithm,
        resetTracking,
        setArray,
        setSelectedAlgorithm,
        setActiveIndex,
        setCompareIndex,
        setPivotIndex,
        runAlgorithm
    };
}