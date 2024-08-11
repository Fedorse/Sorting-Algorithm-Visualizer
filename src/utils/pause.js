import { sleep } from './sleep';

export const pause = async (evalStateRef, playerStateRef, trackRef, speedRef) => {
    console.log('evalStateRef, playerStateRef, trackRef', evalStateRef, playerStateRef, trackRef);

    if (evalStateRef.current === 'paused') {
        if (playerStateRef.current === 'backward') {
            trackRef.current.setPlayerState(null);
            trackRef.current.decrementTrack()
        } else if (playerStateRef.current === 'forward' && !trackRef.current.isHistoryEnd()) {
            trackRef.current.setPlayerState(null);
            trackRef.current.incrementTrack()
        } else if (playerStateRef.current === 'forward') {
            trackRef.current.setPlayerState(null);
            pause(evalStateRef, playerStateRef, trackRef)
            return
        } else {
            await sleep(speedRef.current);
            return pause(evalStateRef);
        }
    } else {
        return;
    }
};
