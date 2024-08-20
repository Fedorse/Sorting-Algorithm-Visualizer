import { useCallback } from 'react';
import Array from './components/Array/Array';
import { usePlayer, useHistory, useAlgorithm } from './hooks';
import { ResetIcon } from './components/icon/ResetIcon';
import PauseIcon from './components/icon/PauseIcon';
import PlayIcon from './components/icon/PlayIcon';
import Player from './components/Player/Player';
import { disableScroll } from './utils/disableScroll';

const App = () => {
    const history = useHistory();

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

    // Handles Play button
    const handleAlgorithmRun = useCallback(async () => {
        if (algorithmState === 'notStarted') {
            await runAlgorithm();
        } else if (algorithmState === 'finished') {
            return resetAll();
        }

        if (player.playerState === 'play') {
            player.setPlayerState('pause');
        } else if (player.playerState === 'pause') {
            player.setPlayerState('play');
        }
    }, [player, runAlgorithm, resetAll, algorithmState]);


    // refactor - move logic to Player
    const getButtonText = useCallback(() => {
        if (algorithmState === 'notStarted') {
            return <PlayIcon />;
        } else if (algorithmState === 'finished') {
            return <ResetIcon />;
        }

        if (player.playerState === 'play') {
            return <PauseIcon />;
        } {
            return <PlayIcon />;
        }
    }, [algorithmState, player]);


    // refactor - use CSS instead of JS logic  (hint: media queries, dvh units)
    const barWidth = window.screen.width / array.length;
    disableScroll();

    const step = getCurrentStep();

    return (
        <section>
            <span className="title-algorithm">{selectedAlgorithm} Sort</span>
            <Array {...step} barWidth={barWidth} />
            <Player
                selectAlgorithm={selectAlgorithm}
                goToNextStep={() => player.setPlayerState('forward')}
                getButtonText={getButtonText}
                goToPreviousStep={() => player.setPlayerState('backward')}
                speed={player.speed}
                resetAlgorithm={resetAll}
                setSpeed={(speed) => player.setSpeed(speed)}
                handleAlgorithmRun={handleAlgorithmRun}
                selectedAlgorithm={selectedAlgorithm}
                evalState={player.evalState}
                currentTrack={history.currentTrack}
            />
        </section>
    );
};

export default App;
