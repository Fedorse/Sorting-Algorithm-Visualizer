import React, { ReactNode } from 'react';

import classes from './Button.module.css';

type ButtonProps = Partial<{
  onClick: () => void;
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onTouchCancel: (event: React.TouchEvent<HTMLButtonElement>) => void;
  onTouchStart: (event: React.TouchEvent<HTMLButtonElement>) => void;
  onTouchEnd: (event: React.TouchEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  className: string;
  isDisabled: boolean;
}>;

const Button: React.FC<ButtonProps> = ({
  isDisabled,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchCancel,
  onTouchStart,
  onTouchEnd,
  children,
  className,
}) => {
  return (
    <button
      disabled={isDisabled}
      className={`${classes.button} ${className}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      onTouchStart={onTouchStart}
    >
      {children}
    </button>
  );
};

export default Button;
