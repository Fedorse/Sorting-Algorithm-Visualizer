import { useCallback } from 'react';

import { usePlayer, useHistory, useAlgorithm } from './hooks';
import type { AlgorithmHistory } from './hooks';

import { disableScroll } from './utils/disableScroll';

import BarContainer from './components/BarContainer/BarContainer';
import Player from './components/Player/Player';
import Modal from './components/Modal/Modal';

const App = () => {
  const history: AlgorithmHistory = useHistory();

  const player = usePlayer();

  const {
    algorithmState,
    selectedAlgorithm,
    selectAlgorithm,
    resetAll,
    runAlgorithm,
    getCurrentStep,
  } = useAlgorithm({ history, player });

  const handlePlay = useCallback(async () => {
    if (algorithmState === 'finished') {
      return resetAll();
    }

    if (algorithmState === 'notStarted') {
      return runAlgorithm();
    }

    if (player.playerState === 'play') {
      player.setPlayerState('pause');
    } else if (player.playerState === 'pause') {
      player.setPlayerState('play');
    }
  }, [player, runAlgorithm, resetAll, algorithmState]);

  const handleBack = useCallback(() => {
    player.setPlayerState('backward');
    if (algorithmState === 'finished') {
      history.decrementTrack();
    }
  }, [player, history, algorithmState]);

  const handleForward = useCallback(() => {
    player.setPlayerState('forward');
    if (algorithmState === 'finished') {
      history.incrementTrack();
    }
  }, [player, history, algorithmState]);

  disableScroll();

  const step = getCurrentStep();

  return (
    <section>
      <Modal />
      <span className="title-algorithm">{selectedAlgorithm} Sort</span>
      <BarContainer {...step} />
      <Player
        selectAlgorithm={selectAlgorithm}
        goToNextStep={handleForward}
        goToPreviousStep={handleBack}
        speed={player.speed}
        resetAlgorithm={resetAll}
        setSpeed={(speed) => player.setSpeed(speed)}
        handlePlay={handlePlay}
        selectedAlgorithm={selectedAlgorithm}
        algorithmState={algorithmState}
        playerState={player.playerState}
      />
    </section>
  );
};

export default App;
