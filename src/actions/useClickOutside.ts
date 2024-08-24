import { useEffect } from 'react';

type useClickOutsideProps = {
  callback: () => void;
  targetClass: string;
};

const useClickOutside = ({
  callback,
  targetClass,
}: useClickOutsideProps): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement | null;
      if (target && !target.closest(`.${targetClass}`)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, targetClass]);
};

export default useClickOutside;
