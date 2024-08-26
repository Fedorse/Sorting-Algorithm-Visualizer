import Bar from '../Bar/Bar';
import { Tracking } from '../../hooks';

import './BarContainer.css';

type BarContainerProps = {
  array: number[];
  tracking: Tracking;
};

const getIndexType = (index: number, tracking: Tracking) => {
  if (index === tracking.activeIndex) {
    return 'active';
  } else if (index === tracking.compareIndex) {
    return 'compare';
  } else if (index === tracking.pivotIndex) {
    return 'pivot';
  } else {
    return null;
  }
};

const BarContainer: React.FC<BarContainerProps> = ({ array, tracking }) => {
  //Calculate width each column in array
  // console.log("array", array);
  // console.log('tracking', tracking);

  const barWidth = window.screen.width / array.length;

  return (
    <div className="arr">
      {array.map((heightPx, index) => (
        <Bar
          key={index}
          width={barWidth}
          height={heightPx}
          indexType={getIndexType(index, tracking)}
        />
      ))}
    </div>
  );
};

export default BarContainer;
