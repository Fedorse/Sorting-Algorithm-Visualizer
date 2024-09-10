import { useCallback } from 'react';

import { usePlayer, useHistory, useAlgorithm } from './hooks';
import type { AlgorithmHistory } from './hooks';

import { disableScroll } from './utils/disableScroll';

import BarContainer from './components/BarContainer/BarContainer';
import Navbar from './components/Navbar/Navbar';
import Player from './components/Player/Player';

const App = () => {
  const history: AlgorithmHistory = useHistory();

  const player = usePlayer();

  const {
    array,
    algorithmState,
    selectedAlgorithm,
    selectAlgorithm,
    resetAll,
    runAlgorithm,
    getCurrentStep,
  } = useAlgorithm({ history, player });

  const handlePlay = useCallback(async () => {
    if (algorithmState === 'finished') {
      return resetAll(array.length);
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
    <>
      <Navbar />
      <BarContainer {...step} algorithmState={algorithmState} />
      <Player
        speed={player.speed}
        setSpeed={player.setSpeed}
        selectAlgorithm={selectAlgorithm}
        goToNextStep={handleForward}
        goToPreviousStep={handleBack}
        resetAlgorithm={resetAll}
        handlePlay={handlePlay}
        selectedAlgorithm={selectedAlgorithm}
        algorithmState={algorithmState}
        playerState={player.playerState}
      />
    </>
  );
};

export default App;
