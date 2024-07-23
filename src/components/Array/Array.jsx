import Bar from '../Bar/Bar'
import './Array.css'

 const Array = ({array, activeIndex, barWidth, compareIndex, pivotIndex}) => (
  
    <div className="arr">
      {
        array.map((heightPx, index)=>(
          <Bar
          key={index}
          width={barWidth}
          height={heightPx}
          isActive={index === activeIndex}
          isCompare={index === compareIndex} 
          isPivot = {index === pivotIndex}
  
          />
        ))
      }
    </div>

  )

  export default Array