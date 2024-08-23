// import { sleep } from '../../utils/sleep';
// import { pause } from '../../utils/pause';

// const partition = async (
//   arr,
//   start,
//   end,
//   setActiveIndex,
//   setCompareIndex,
//   setPivotIndex,
//   evalStateRef,
//   speedRef,
//   playerStateRef,
//   trackRef,
//   updateArray,
// ) => {
//   const pivotElement = arr[end];
//   let partitionIndex = start;
//   // setActiveIndex(end);
//   // setPivotIndex(partitionIndex);
//   // await sleep(100, speedRef.current);

//   for (let i = start; i < end; i++) {
//     await pause(evalStateRef, playerStateRef, trackRef, speedRef);
//     if (evalStateRef === 'notStarted') {
//       throw new Error('cancelSort');
//     }
//     setCompareIndex(i);
//     // await sleep(100, speedRef.current);

//     if (arr[i] < pivotElement) {
//       [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];

//       updateArray([...arr], null, null, null);
//       await sleep(20, speedRef.current);
//       partitionIndex++;
//     }
//   }

//   [arr[partitionIndex], arr[end]] = [arr[end], arr[partitionIndex]];
//   updateArray([...arr], null, null, null);
//   await sleep(50, speedRef.current);

//   return partitionIndex;
// };

// const quickSortRecursive = async (
//   arr,
//   start,
//   end,
//   setActiveIndex,
//   setCompareIndex,
//   setPivotIndex,
//   evalStateRef,
//   speedRef,
//   playerStateRef,
//   trackRef,
//   updateArray,
// ) => {
//   if (start >= end) {
//     return;
//   }
//   await pause(evalStateRef, playerStateRef, speedRef, trackRef);
//   if (evalStateRef === 'notStarted') {
//     throw new Error('cancelSort');
//   }

//   const index = await partition(
//     arr,
//     start,
//     end,
//     setActiveIndex,
//     setCompareIndex,
//     setPivotIndex,
//     evalStateRef,
//     speedRef,
//     playerStateRef,
//     trackRef,
//     updateArray,
//   );

//   await quickSortRecursive(
//     arr,
//     start,
//     index - 1,
//     setActiveIndex,
//     setCompareIndex,
//     setPivotIndex,
//     evalStateRef,
//     speedRef,
//     playerStateRef,
//     trackRef,
//     updateArray,
//   );
//   await quickSortRecursive(
//     arr,
//     index + 1,
//     end,
//     setActiveIndex,
//     setCompareIndex,
//     setPivotIndex,
//     evalStateRef,
//     speedRef,
//     playerStateRef,
//     trackRef,
//     updateArray,
//   );
// };

// // array,
// // updateArray,
// // setActiveIndex,
// // setCompareIndex,
// // evalStateRef,
// // speedStateRef,
// // playerStateRef,
// // trackRef,

// export const quickSort = async (
//   array,
//   updateArray,
//   setActiveIndex,
//   setCompareIndex,
//   setPivotIndex,
//   evalStateRef,
//   speedRef,
//   playerStateRef,
//   trackRef,
// ) => {
//   await quickSortRecursive(
//     array,
//     0,
//     array.length - 1,
//     setActiveIndex,
//     setCompareIndex,
//     setPivotIndex,
//     evalStateRef,
//     speedRef,
//     playerStateRef,
//     trackRef,
//     updateArray,
//   );

//   setActiveIndex(null);
//   setCompareIndex(null);
//   setPivotIndex(null);

//   return array;
// };
