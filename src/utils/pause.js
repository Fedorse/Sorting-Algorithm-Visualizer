import { sleep } from './sleep';

export const pause = async ({
    player,
    history,
}) => {
    await sleep(player.speed);

    if (player.evalStateRef.current === 'paused') {
        if (player.playerStateRef.current === 'backward') {
            player.setPlayerState(null);
            history.decrementTrack();
        } else if (
            player.playerStateRef.current === 'forward' &&
            !history.isHistoryEnd()
        ) {
            player.setPlayerState(null);
            history.incrementTrack();
        } else if (player.playerStateRef.current === 'forward') {
            player.setPlayerState(null);
            return;
        }

        return pause({
            player,
            history,
        });
    } else {
        return sleep(player.speed);
    }
};
