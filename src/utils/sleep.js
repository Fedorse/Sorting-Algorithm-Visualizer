export const sleep = (ms,speedFactor) => {
    return new Promise((resolve) => 
      setTimeout((resolve), ms / speedFactor ))
  }
