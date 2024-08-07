export const generateRandomArray = (length, min, max) => {
    const array = Array.from({length}, () => Math.floor(Math.random () * ( max - min + 1 )) + min)
    return array
    }
    