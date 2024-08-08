import { useEffect, useState } from "react";
import { selectionSort } from "./components/algorithms/selectionSort";
import { quickSort } from "./components/algorithms/quickSort";
import Array from "./components/Array/Array";
import { bubbleSort } from "./components/algorithms/bubbleSort";
import { insertionSort } from "./components/algorithms/insertionSort";
import { useAlgorithmState } from "./components/hooks/useAlgorithmState";
import { useEvaluationState } from "./components/hooks/useEvaluationState";
import PlayIcon from "./components/icon/PlayIcon";
import PauseIcon from "./components/icon/PauseIcon";
import ResumePlay from "./components/icon/ResumePlay";
import Player from "./components/Player/Player";

// type AlgState = 'started' | 'notStarted' | 'paused' | 'finished'

const App = () => {
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

  const {
    evalState,
    speed,
    history,
    currentStep,
    evalStateRef,
    setSpeed,
    setEvalState,
    speedRef,
    updateHistory,
    goToNextStep,
    goToPreviousStep,
    resetHistory,
  } = useEvaluationState();

  const [shouldSort, setShouldSort] = useState(false);

  useEffect(() => {
    if (shouldSort) {
      setShouldSort(false);
      handleSort();
    }
  }, [shouldSort]);

  const handleAlgorithmRun = async () => {
    if (evalState === "notStarted") {
      await handleSort();
    } else if (evalState === "started") {
      setEvalState("paused");
    } else if (evalState === "paused") {
      setEvalState("started");
    } else if (evalState === "finished") {
      resetArray();
      resetHistory();
      setShouldSort(true);
    }
  };

  const handleSort = async () => {
    try {
      setEvalState("started");
      if (selectedAlgorithm === "selection") {
        await selectionSort(
          array,
          setArray,
          setActiveIndex,
          setCompareIndex,
          evalStateRef,
          speedRef,
          updateHistory,
        );
      } else if (selectedAlgorithm === "bubble") {
        await bubbleSort(
          array,
          setArray,
          setActiveIndex,
          setCompareIndex,
          evalStateRef,
          speedRef,
        );
      } else if (selectedAlgorithm === "quick") {
        await quickSort(
          array,
          setActiveIndex,
          setArray,
          setPivotIndex,
          setCompareIndex,
          evalStateRef,
          speedRef,
        );
      } else if (selectedAlgorithm === "insertion") {
        await insertionSort(
          array,
          setArray,
          setActiveIndex,
          setCompareIndex,
          evalStateRef,
          speedRef,
        );
      }
      setEvalState("finished");
      resetTracking();
    } catch (e) {
      if (e.message === "cancelSort") {
        console.log("Sort cancelled");
        resetTracking();
      }
    }
  };

  const getButtonText = () => {
    if (evalState === "notStarted") {
      return <ResumePlay />;
    } else if (evalState === "started") {
      return <PauseIcon />;
    } else if (evalState === "paused") {
      return <ResumePlay />;
    } else {
      return <PlayIcon />;
    }
  };

  const selectAlgorithm = (newAlgorithm) => {
    resetTracking();
    setEvalState("notStarted");
    setSelectedAlgorithm(newAlgorithm);
    resetHistory();
    resetArray();
  };

  const resetAlgorithm = () => {
    setEvalState("notStarted");
    resetTracking();
    resetArray();
    resetHistory();
  };

  const barWidth = window.screen.width / array.length;

  return (
    <section>
      <span className="title-algorithm">{selectedAlgorithm} Sort</span>
      <Array
        array={array}
        activeIndex={activeIndex}
        barWidth={barWidth}
        compareIndex={compareIndex}
        pivotIndex={pivotIndex}
        history={history}
        currentStep={currentStep}
      />
      {/* <Select selectedAlgorithm={selectedAlgorithm} onChange={selectAlgorithm}/> */}
      <Player
        selectAlgorithm={selectAlgorithm}
        goToNextStep={goToNextStep}
        getButtonText={getButtonText}
        goToPreviousStep={goToPreviousStep}
        speed={speed}
        resetAlgorithm={resetAlgorithm}
        setSpeed={setSpeed}
        handleAlgorithmRun={handleAlgorithmRun}
        selectedAlgorithm={selectedAlgorithm}
      />
    </section>
  );
};

export default App;
