import { useEffect, useState, useRef, useCallback } from 'react';

export const useHistoryState = () => {
    const [history, setHistory] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(0);

    const incrementTrack = useCallback(() => {
        setCurrentTrack((prevTrack) => prevTrack + 1)
    }, [setCurrentTrack]);

    const decrementTrack = useCallback(() => {
        setCurrentTrack((prevTrack) => prevTrack - 1)
    }, [setCurrentTrack]);

    const isHistoryEnd = useCallback(() => {
        return currentTrack === history.length - 1
    }, [currentTrack, history.length]);


    const trackRef = useRef({ currentTrack, incrementTrack, decrementTrack, setCurrentTrack, isHistoryEnd })

    useEffect(() => {
        trackRef.current = { currentTrack, incrementTrack, decrementTrack, setCurrentTrack, isHistoryEnd }
    }, [currentTrack, incrementTrack, decrementTrack, setCurrentTrack, isHistoryEnd])


    const updateHistory = useCallback((newState) => {
        setHistory((prevHistory) => [...prevHistory, newState]);
        incrementTrack()
    }, [setHistory, incrementTrack]);

    const resetHistory = () => {
        setHistory([]);
        setCurrentTrack(0);
    };

    return {
        history,
        currentTrack,
        updateHistory,
        resetHistory,
        incrementTrack,
        decrementTrack,
        isHistoryEnd,
        trackRef,
    };
};
