import { sleep } from "./sleep";

export const pause = async (evalStateRef) => {

    if(evalStateRef.current === 'paused'){
        await sleep(100)
        return pause(evalStateRef)
    } else {
        return undefined
    }
}