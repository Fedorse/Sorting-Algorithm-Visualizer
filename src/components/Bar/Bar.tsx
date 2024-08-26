import './Bar.css';

type IndexType = 'active' | 'compare' | 'pivot' | null;

type BarProps = {
    width: number;
    height: number;
    indexType: IndexType;
};

const Bar: React.FC<BarProps> = ({
    width,
    height,
    indexType
}) => {
    const barStyles = {
        height: `${height}px`,
        width: `${width}px`,
    };

    return (
        <div
            className={`bar ${indexType ?? ''}`}
            style={barStyles}
        />
    );
};

export default Bar;
