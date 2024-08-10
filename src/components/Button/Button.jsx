import './Button.css';

const Button = ({
  onClick,
  children,
  className,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchCancel,
  onTouchStart,
  onTouchEnd,
  disabled,
}) => {
  return (
    <button
      className={`button ${className}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      onTouchStart={onTouchStart}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
