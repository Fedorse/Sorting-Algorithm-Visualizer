import { sleep } from "../../utils/sleep"


export const insertionSort = async(array, setArray, setActiveIndex,setCompareIndex,cancelSort) => {
    let arr = [...array]
    for( let i = 1; i < arr.length; i++){
        if(cancelSort.current) return undefined
        const temp = arr[i]
        let j = i - 1
        setActiveIndex(i)
        await sleep(500)
        while(j >= 0 && arr[j] > temp) {
            if(cancelSort.current) return undefined
            arr[j + 1 ] = arr[j]
            j--
            setCompareIndex(j)
            await sleep(500)

        }
        arr[j+1] = temp
        await sleep(500)
        setArray([...arr])
    }
    setActiveIndex(null)
    setCompareIndex(null)
}
