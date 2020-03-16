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

        animations.push({'confirmed': arr.length - 1 - i})
    }

    return animations;
}

export function selectionSort(arr) {
    let max;
    let maxidx;
    let animations = [];

    for (let i = 0; i < arr.length; i++) {
        max = arr[0];
        maxidx = 0;

        for (let k = 0; k < arr.length - i; k++) {
            animations.push({'compare': [k, maxidx]});

            if (arr[k] > max) {
                max = arr[k];
                maxidx = k;
            }
        }

        animations.push({'swap': [arr.length - 1 - i, maxidx]})
        animations.push({'confirmed': arr.length - 1 - i})
        arr[maxidx] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = max;

    }

    return animations;
};