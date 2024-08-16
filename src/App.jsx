import { useCallback, useEffect, useState } from 'react';
import Array from './components/Array/Array';
import { usePlayer, useHistory, useAlgorithm } from './hooks';
import PlayIcon from './components/icon/PlayIcon';
import PauseIcon from './components/icon/PauseIcon';
import ResumePlay from './components/icon/ResumePlay';
import Player from './components/Player/Player';
// import { algorithms } from './components/algorithms';
import { disableScroll } from './utils/disableScroll';

const App = () => {
    const history = useHistory();

    const player = usePlayer();

    const {
        array,
        selectedAlgorithm,
        activeIndex,
        compareIndex,
        pivotIndex,
        selectAlgorithm,
        resetAlgorithm,
        // resetTracking,
        // setArray,
        // setSelectedAlgorithm,
        // setActiveIndex,
        // setCompareIndex,
        // setPivotIndex,
        runAlgorithm
    } = useAlgorithm({ history, player });

    const handleAlgorithmRun = useCallback(async () => {
        if (player.evalState === 'notStarted') {
            await runAlgorithm(selectedAlgorithm, player.evalState);
        } else if (player.evalState === 'started') {
            player.setEvalState('paused');
        } else if (player.evalState === 'paused') {
            player.setEvalState('started');
        } else if (player.evalState === 'finished') {
            resetAlgorithm();
        }
    }, [player, selectedAlgorithm, runAlgorithm, resetAlgorithm]);


    const getButtonText = useCallback(() => {
        if (player.evalState === 'notStarted') {
            return <ResumePlay />;
        } else if (player.evalState === 'started') {
            return <PauseIcon />;
        } else if (player.evalState === 'paused') {
            return <ResumePlay />;
        } else if (player.evalState === 'finished') {
            return <PlayIcon />;
        }
    }, [player.evalState]);


    const barWidth = window.screen.width / array.length;
    disableScroll();

    const data =
        player.evalState === 'paused' && !history.isHistoryEnd()
            ? history.getCurrentHistoryItem()
            : { array, activeIndex, compareIndex, pivotIndex };

    // console.log('DATA', data);


    return (
        <section>
            <span className="title-algorithm">{selectedAlgorithm} Sort</span>
            <Array {...data} barWidth={barWidth} />
            <Player
                selectAlgorithm={selectAlgorithm}
                goToNextStep={() => player.setPlayerState('forward')}
                getButtonText={getButtonText}
                goToPreviousStep={() => player.setPlayerState('backward')}
                speed={player.speed}
                resetAlgorithm={resetAlgorithm}
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
