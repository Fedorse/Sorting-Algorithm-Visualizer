import { useEffect } from 'react';

const useClickOutside = (callback, targetClass) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${targetClass}`)) {
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