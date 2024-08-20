import { pause } from '../utils/pause';

export const bubbleSort = async ({
    array,
    updateArray,
    updateTracking,
    history,
    player,
}) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            await pause({ history, player });

            updateTracking({ activeIndex: j, compareIndex: j + 1 });

            if (array[j + 1] < array[j]) {

                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
                updateArray(array);
            }
        }
    }
};
