import Bar from '../Bar/Bar';
import { Tracking } from '../../types';

import './BarContainer.css';

type BarContainerProps = {
  array: number[];
  tracking: Tracking;
};

const BarContainer: React.FC<BarContainerProps> = ({ array, tracking }) => {
  const { activeIndex, compareIndex, pivotIndex } = tracking;

  //Calculate width each column in array
  const barWidth = window.screen.width / array.length;

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

export default BarContainer;
