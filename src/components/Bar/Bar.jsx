import './Bar.css';

const Bar = ({ width, height, isActive, isCompare, isPivot }) => {
  const barStyles = {
    height: `${height}px`,
    width: `${width}px`,
  };
  return (
    <div
      className={`bar ${isActive ? 'active' : ''} ${isCompare ? 'compare' : ''} ${isPivot ? 'pivot' : ''} `}
      style={barStyles}
    />
  );
};

export default Bar;
