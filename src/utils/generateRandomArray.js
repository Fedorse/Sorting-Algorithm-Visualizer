export const generateRandomArray = (length, min, max) => {
    console.log('test')
    const array = Array.from({length}, () => Math.floor(Math.random () * ( max-min +1 )) +min)
    return array
    }
    