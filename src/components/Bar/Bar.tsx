import './Bar.css';

type BarProps = {
  width: number;
  height: number;
  isActive: boolean | null;
  isCompare: boolean | null;
  isPivot: boolean | null;
};

const Bar: React.FC<BarProps> = ({
  width,
  height,
  isActive,
  isCompare,
  isPivot,
}) => {
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
