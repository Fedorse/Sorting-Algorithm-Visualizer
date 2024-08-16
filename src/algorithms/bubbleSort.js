import { pause } from '../utils/pause';

export const bubbleSort = async ({
    array,
    updateArray,
    history,
    player,
}) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            if (array[j + 1] < array[j]) {
                await pause({ history, player });

                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;

                updateArray([...array], j, j + 1, null);
            }
        }
    }
};
