import { useEffect, useState } from 'react';
import { generateRandomArray } from '../../utils/generateRandomArray';

export const useAlgorithmState = () => {
  const [array, setArray] = useState(generateRandomArray(10, 150, 650));
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('quick');
  const [activeIndex, setActiveIndex] = useState(null);
  const [compareIndex, setCompareIndex] = useState(null);
  const [pivotIndex, setPivotIndex] = useState(null);

  const resetArray = () => {
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
  return {
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
  };
};
