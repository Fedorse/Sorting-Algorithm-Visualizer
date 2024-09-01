import Bar from '../Bar/Bar';
import { Tracking } from '../../hooks';

import clasess from './BarContainer.module.css';

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
  } else if (tracking.sortedIndices?.includes(index)) {
    return 'sorted';
  } else {
    return null;
  }
};

const BarContainer: React.FC<BarContainerProps> = ({ array, tracking }) => {
  //Calculate width each column in array
  const barWidth = window.screen.width / array.length;

  return (
    <section>
      <div className={clasess.arr}>
        {array.map((heightPx, index) => (
          <Bar
            key={index}
            width={barWidth}
            height={heightPx}
            indexType={getIndexType(index, tracking)}
          />
        ))}
      </div>
    </section>
  );
};

export default BarContainer;
