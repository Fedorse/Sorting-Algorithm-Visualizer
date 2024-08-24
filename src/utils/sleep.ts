export const sleep = (ms: number): Promise<void> => {
  const delay = 1000 / ms;

  return new Promise((resolve) => setTimeout(resolve, delay));
};
