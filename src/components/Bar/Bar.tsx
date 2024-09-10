import './Bar.css';

type IndexType =
  | 'active'
  | 'compare'
  | 'pivot'
  | 'sorted'
  | 'notStarted'
  | null;

type BarProps = {
  width: number;
  height: number;
  indexType: IndexType;
};

const Bar: React.FC<BarProps> = ({ width, height, indexType }) => {
  const barStyles = {
    height: `${height}%`,
    width: `${width}px`,
  };

  return <div className={`bar ${indexType ?? ''}`} style={barStyles} />;
};

export default Bar;
