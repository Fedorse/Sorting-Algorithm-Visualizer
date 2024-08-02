import Bar from '../Bar/Bar'
import './Array.css'

 const Array = ({array, activeIndex, barWidth, compareIndex, pivotIndex, history,currentStep}) => {
  const displayState = history[currentStep] || { array, activeIndex, compareIndex, pivotIndex };
    return (
      <div className="arr">
      {
        displayState.array.map((heightPx, index)=>(
          <Bar
          key={index}
          width={barWidth}
          height={heightPx}
          isActive={index === displayState.activeIndex}
          isCompare={index === displayState.compareIndex}
          isPivot={index === displayState.pivotIndex}
  
          />
        ))
      }
    </div>
    )

    }

  export default Array