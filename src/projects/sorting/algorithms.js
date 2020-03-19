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

export function quickSort(arr) {
    function quickSortHelper(arr, L=0) {
        if (arr.length < 1) {
            return arr;
        }
        
        if (arr.length === 1) {
            animations.push({'confirmed': (L)});
            return arr;
        }

        let pivot = Math.floor(Math.random() * arr.length);
        animations.push({'pivot': (L+pivot)})

        let i = 0;
        while (i < arr.length) {
            if (i < pivot) {
                animations.push({'compare': [L+i, L+pivot]})
                if (arr[i] <= arr[pivot]) {
                    i++;
                } else {
                    arr = swap(arr, i, pivot-1);
                    arr = swap(arr, pivot-1, pivot);
                    animations.push({'swap': [L+i, L+pivot-1]})
                    animations.push({'swap': [L+pivot-1, L+pivot]})
                    pivot--;
                }
            } else {
                animations.push({'compare': [L+i, L+pivot]})
                if (arr[i] >= arr[pivot]) {
                    i++;
                } else {
                    arr = swap(arr, i, pivot+1);
                    arr = swap(arr, pivot+1, pivot);
                    animations.push({'swap': [L+i, L+pivot+1]})
                    animations.push({'swap': [L+pivot+1, L+pivot]})
                    pivot++;
                }
            }
        }

        return quickSortHelper(arr.slice(0, pivot), L).concat(arr[pivot],
            quickSortHelper(arr.slice(pivot+1, arr.length), L+pivot+1))
        
    }

    let animations = [];

    console.log(quickSortHelper(arr))

    return animations
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    return arr;
};

export function mergeSort(arr) {
    let animations = [];

    function splitdown(arr, L) {
        if (arr.length != 1) {
            const mid = Math.floor(arr.length/2);
            const arr1 = splitdown(arr.slice(0, mid), L);
            const arr2 = splitdown(arr.slice(mid, arr.length), L+mid);
        } else {
            return arr
        }

        
        return merge(arr1, arr2, L, L+mid);
    }

    function merge(arr1, arr2, L1, L2) {
        let i, j = 0;

        let temp = [];

        while (arr1.length !== i && arr2.length !== j) {
            
            animations.push({'compare': [L1 + i, L2 + j]});
            if (arr1[0] < arr2[0]) {
                temp.push(arr1[0])
                arr1.shift()
                i++;
            } else {
                temp.push(arr2[0])
                arr2.shift()
                j++;
            };
        };

        temp.concat(arr1);
        temp.concat(arr2);

        animations.push({'overwrite': [L1, temp]});

        return temp;
    }

    splitdown(arr, 0)
    return animations
}