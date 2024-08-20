import Bar from '../Bar/Bar';
import './Array.css';

const Array = ({ barWidth, array, tracking }) => {
    // console.log('arr', array);
    const { activeIndex, compareIndex, pivotIndex } = tracking;
    // console.log('activeIndex, compareIndex, pivotIndex', activeIndex, compareIndex, pivotIndex);
    // console.log('array', array);


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
