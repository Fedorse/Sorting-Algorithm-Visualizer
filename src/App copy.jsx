import { useCallback, useEffect, useState } from 'react';
import Array from './components/Array/Array';
import { useAlgorithmState } from './components/hooks/useAlgorithmState';
import { useHistoryState } from './components/hooks/useHistoryState';
import { usePlayerState } from './components/hooks/usePlayerState';
import PlayIcon from './components/icon/PlayIcon';
import PauseIcon from './components/icon/PauseIcon';
import ResumePlay from './components/icon/ResumePlay';
import Player from './components/Player/Player';
import { algorithms } from './components/algorithms';
import { disableScroll } from './utils/disableScroll';

// type AlgState = 'started' | 'notStarted' | 'paused' | 'finished'

const App = () => {
  const {
    history,
    currentTrack,
    updateHistory,
    resetHistory,
    trackRef,
    isHistoryEnd,
    setHistory,
    setCurrentTrack,
  } = useHistoryState();

  const {
    playerState,
    evalState,
    setEvalState,
    backward,
    forward,
    speed,
    setPlayerState,
    setSpeed,
    playerStateRef,
    speedStateRef,
    evalStateRef,
  } = usePlayerState();

  const {
    array,
    selectedAlgorithm,
    activeIndex,
    compareIndex,
    pivotIndex,
    resetArray,
    resetTracking,
    setArray,
    setSelectedAlgorithm,
    setActiveIndex,
    setCompareIndex,
    setPivotIndex,
  } = useAlgorithmState();

  const [shouldSort, setShouldSort] = useState(false);

  useEffect(() => {
    if (shouldSort) {
      setShouldSort(false);
      handleSort();
    }
  }, [shouldSort]);

  const handleAlgorithmRun = async () => {
    if (evalState === 'notStarted') {
      await handleSort();
    } else if (evalState === 'started') {
      setEvalState('paused');
    } else if (evalState === 'paused') {
      setEvalState('started');
    } else if (evalState === 'finished') {
      resetArray();
      resetHistory();
      setShouldSort(true);
    }
  };

  const updateArray = useCallback(
    (newArray, activeIndx, compareIndx, pivotIndx) => {
      console.log('new arra', newArray);

      setHistory((prevHistory) => {
        const nextHistory = [
          ...prevHistory,
          {
            array: [...newArray],
            activeIndex: activeIndx,
            compareIndex: compareIndx,
            pivotIndex: pivotIndx,
          },
        ];
        setCurrentTrack(nextHistory.length - 1);
        return nextHistory;
      });
      setArray([...newArray]);
    },
    [setArray, setHistory, setCurrentTrack],
  );

  const handleSort = async () => {
    try {
      setEvalState('started');
      //   debugger;
      await algorithms[selectedAlgorithm](
        array,
        updateArray,
        setActiveIndex,
        setCompareIndex,
        evalStateRef,
        speedStateRef,
        playerStateRef,
        trackRef,
      );
      setEvalState('finished');
      resetTracking();
    } catch (e) {
      if (e.message === 'cancelSort') {
        resetTracking();
      }
    }
  };

  const getButtonText = () => {
    if (evalState === 'notStarted') {
      return <ResumePlay />;
    } else if (evalState === 'started') {
      return <PauseIcon />;
    } else if (evalState === 'paused') {
      return <ResumePlay />;
    } else if (evalState === 'finished') {
      return <PlayIcon />;
    }
  };

  const selectAlgorithm = (newAlgorithm) => {
    resetTracking();
    setEvalState('notStarted');
    setPlayerState(null);
    setSelectedAlgorithm(newAlgorithm);
    resetHistory();
    resetArray();
  };

  const resetAlgorithm = () => {
    setEvalState('notStarted');
    setPlayerState(null);
    resetTracking();
    resetArray();
    resetHistory();
  };

  const barWidth = window.screen.width / array.length;
  disableScroll();

  const data =
    evalState === 'paused' && !isHistoryEnd()
      ? history[currentTrack]
      : { array, activeIndex, compareIndex, pivotIndex };
  return (
    <section>
      <span className="title-algorithm">{selectedAlgorithm} Sort</span>
      <Array {...data} barWidth={barWidth} />
      <Player
        selectAlgorithm={selectAlgorithm}
        goToNextStep={forward}
        getButtonText={getButtonText}
        goToPreviousStep={backward}
        speed={speed}
        resetAlgorithm={resetAlgorithm}
        setSpeed={setSpeed}
        handleAlgorithmRun={handleAlgorithmRun}
        selectedAlgorithm={selectedAlgorithm}
        evalState={evalState}
        currentTrack={currentTrack}
      />
    </section>
  );
};

export default App;
