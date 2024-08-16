import { useCallback, useEffect, useState } from "react";

export const useHistory = () => {
    const [history, setHistory] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(0);

    const incrementTrack = useCallback(() => {
        setCurrentTrack((prevTrack) => prevTrack + 1);
    }, [setCurrentTrack]);

    const decrementTrack = useCallback(() => {
        setCurrentTrack((prevTrack) => {
            return Math.max(0, prevTrack - 1);
        });
    }, [setCurrentTrack]);

    const isHistoryEnd = useCallback(() => {
        return currentTrack === history.length - 1;
    }, [currentTrack, history]);

    const updateHistory = useCallback(
        (newState) => {
            setHistory((prevHistory) => ([...prevHistory, newState]))
        },
        [setHistory, incrementTrack],
    );

    useEffect(() => {
        setCurrentTrack(Math.max(0, history.length - 1));
    }, [history, setCurrentTrack])

    const resetHistory = useCallback(() => {
        setHistory([]);
    }, [setHistory]);

    const getCurrentHistoryItem = useCallback(() => {
        return history[currentTrack]
    }, [history, currentTrack])

    return {
        history,
        currentTrack,
        getCurrentHistoryItem,
        updateHistory,
        resetHistory,
        incrementTrack,
        decrementTrack,
        isHistoryEnd,
    };
};