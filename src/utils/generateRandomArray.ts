export const generateRandomArray = (
  length: number,
  min: number,
  max: number,
): number[] => {
  const array = Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );
  return array;
};
