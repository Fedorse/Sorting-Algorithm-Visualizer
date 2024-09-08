export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime >= ms) {
        resolve();
      } else {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  });
};
