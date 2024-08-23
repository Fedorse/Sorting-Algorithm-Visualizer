import Bar from '../Bar/Bar';

import './BarContainer.css';

const Array = ({ barWidth, array, tracking }) => {
  const { activeIndex, compareIndex, pivotIndex } = tracking;

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
