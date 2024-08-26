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


export const tempArray = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100];
