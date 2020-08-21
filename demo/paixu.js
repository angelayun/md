// 冒泡排序
function bubble (arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        // console.log(i);
        let flag = false
        for (let j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                let temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp;
                flag = true;
            }
        }
        // 优化标识位
        if (!flag) {
            break;
        }
    }
    return arr
}
// 插入排序
function charu (arr) {
    for (let i = 1; i < arr.length; i++) {
        let value = arr[i]
        let j = i - 1
        for (; j >= 0; j--) {
            if (arr[j] > value) {
                arr[j + 1] = arr[j];
            } else {
                break;
            }
        }
        arr[j + 1] = value;
    }
    return arr;
}
var arr=[4,5,6,3,2,1]
// var arr = [1, 2, 3, 4, 5, 6]
// var arr=[6,5,4,3,2,1]
let change = charu(arr)
console.log(change);