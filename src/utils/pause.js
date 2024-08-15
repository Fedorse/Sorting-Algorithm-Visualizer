import { sleep } from './sleep';

export const pause = async (
  evalStateRef,
  playerStateRef,
  trackRef,
  speedRef,
) => {
  if (evalStateRef.current === 'paused') {
    if (playerStateRef.current.playerState === 'backward') {
      playerStateRef.current.setPlayerState(null);
      trackRef.current.decrementTrack();
    } else if (
      playerStateRef.current.playerState === 'forward' &&
      !trackRef.current.isHistoryEnd()
    ) {
      playerStateRef.current.setPlayerState(null);
      trackRef.current.incrementTrack();
    } else if (playerStateRef.current.playerState === 'forward') {
      playerStateRef.current.setPlayerState(null);
      return;
    }

    await sleep(speedRef.current);

    return pause(evalStateRef, playerStateRef, trackRef, speedRef);
  } else {
    return;
  }
};
