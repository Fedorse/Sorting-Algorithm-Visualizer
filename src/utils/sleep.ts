export const sleep = (ms: number): Promise<void> => {
  const delay = 1000 / ms;
  return new Promise((resolve) => {
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime >= delay) {
        resolve();
      } else {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  });
};
