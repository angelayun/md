// 1. 给定一个8x8的棋盘, 上面有若干个车, 写一个函数检查这些车有没有互相攻击的情况.  输入参数是一个由0和1组成的二维数组
// 说明：
// 1. 数字1为车
// 2. 同一方向（横向/竖向）有2个车，则存在互相攻击的情况


// 3. 存在互相攻击的情况返回true，不存在返回false
let arr = [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]
function checkConflict (arr) {
    // i 行  j 列
    for (let i = 0; i < 8; i++) {
        for (let j = i; j < 8; j++) {
            if (arr[i][j] == 1) {
                for(let k=j+1;k<8;k++){
                    if(arr[i][k]==1){
                        return true
                    }
                }
                for(let k=i+1;k<8;k++){
                    if(arr[k][j]==1){
                        return true
                    }
                }
            }
        }
    }
    return false;
}
let result=checkConflict(arr)
console.log(result)