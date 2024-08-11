import { useEffect } from 'react';
import Bar from '../Bar/Bar';
import './Array.css';

const Array = ({
    barWidth,
    array,
    activeIndex,
    // barWidth,
    compareIndex,
    pivotIndex,
    // history,
    // currentStep,
}) => {
    // const displayState = evalState === 'paused' ? history[currentStep] : {
    //     array,
    //     activeIndex,
    //     compareIndex,
    //     pivotIndex,
    // }

    return (
        <div className="arr">
            {array.map((heightPx, index) => (
                <Bar
                    key={index}
                    width={barWidth}
                    height={heightPx}
                    isActive={index === activeIndex}
                    isCompare={index === compareIndex}
                    isPivot={index === pivotIndex}
                />
            ))}
        </div>
    );
};

export default Array;
