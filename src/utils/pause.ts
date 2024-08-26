import { sleep } from './sleep';
import type { Player } from '../hooks/usePlayer';
import type { AlgorithmHistory } from '../hooks/useAlgorithm';

export const pause = async ({
  player,
  history,
}: {
  player: Player['playerRef'];
  history: AlgorithmHistory['historyRef'];
}): Promise<void> => {
  await sleep(player.current.speed);

  if (player.current.playerState === 'play') {
    return;
  } else {
    if (player.current.playerState === 'backward') {
      player.current.setPlayerState('pause');
      history.current.decrementTrack();
    } else if (
      player.current.playerState === 'forward' &&
      !history.current.isHistoryEnd()
    ) {
      player.current.setPlayerState('pause');
      history.current.incrementTrack();
    } else if (player.current.playerState === 'forward') {
      player.current.setPlayerState('pause');
      return sleep(player.current.speed);
    }

    return pause({
      player,
      history,
    });
  }
};
