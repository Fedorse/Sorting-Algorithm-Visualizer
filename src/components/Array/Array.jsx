import Bar from '../Bar/Bar';
import './Array.css';

const Array = ({ barWidth, array, activeIndex, compareIndex, pivotIndex }) => {
    // console.log('arr', array);

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
