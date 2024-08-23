// import { sleep } from '../../utils/sleep';
// import { pause } from '../../utils/pause';

// export const selectionSort = async (
//   array,
//   updateArray,
//   setActiveIndex,
//   setCompareIndex,
//   evalStateRef,
//   speedRef,
//   playerStateRef,
//   trackRef,
// ) => {
//   let arr = [...array];
//   for (let i = 0; i < arr.length; i++) {
//     let indexMin = i;
//     setActiveIndex(indexMin);
//     updateArray([...arr], indexMin, null, null);
//     for (let j = i + 1; j < arr.length; j++) {
//       setCompareIndex(j);
//       updateArray([...arr], indexMin, j, null);
//       await pause(evalStateRef, playerStateRef, trackRef, speedRef);
//       if (evalStateRef.current === 'notStarted') {
//         throw new Error('cancelSort');
//       }

//       if (arr[j] < arr[indexMin]) {
//         indexMin = j;
//         setActiveIndex(indexMin);
//         updateArray([...arr], indexMin, null, null);
//       }
//     }

//     let tmp = arr[i];
//     arr[i] = arr[indexMin];
//     arr[indexMin] = tmp;

//     updateArray([...arr], indexMin, null, null);

//     await sleep(100, speedRef.current);
//     setCompareIndex(null);
//   }
// };
