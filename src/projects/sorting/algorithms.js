export function bubbleSort(arr) {
    //console.log(arr);
    const animations = [];

    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr.length - 1 - i; k++) {

            animations.push({'compare': [k, k+1]})

            if (arr[k] > arr[k+1]) {
                animations.push({'swap': [k, k+1]})

                let temp = arr[k];
                arr[k] = arr[k+1];
                arr[k+1] = temp
            }
        }
    }

    //console.log(animations)
    return animations;
}