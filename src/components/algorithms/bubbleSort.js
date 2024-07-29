import { sleep } from "../../utils/sleep"



export const  bubbleSort = async(array, setArray ,setActiveIndex,setCompareIndex,cancelSort, speed) => {

    let arr = [...array]
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        if(cancelSort.current ) return undefined
        for(let j = 0; j < arr.length - i - 1 ; j++) {
            if(cancelSort.current ) return undefined

            if(arr[j + 1] < arr[j]){

                setActiveIndex(j)
                setCompareIndex(j + 1)

                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];


                    // let tmp = arr[j]
                    // arr[j] = arr[j + 1]
                    // arr[j + 1] = tmp
                    setArray([...arr])
                    await sleep(100, speed.current)

                }
                count +=1

            }
        
    }
    setActiveIndex(null)
    setCompareIndex(null)
    return arr

}