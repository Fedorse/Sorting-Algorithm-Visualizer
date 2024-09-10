export const generateRandomArray = (length: number): number[] => {
  const min = 23;
  const max = 100;

  const array = Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );
  return array;
};
