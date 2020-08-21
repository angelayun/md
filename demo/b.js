let arr = [
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
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
            if(arr[i][j]==0){
                let flag = true;
                for (let k = j + 1; k < 8; k++) {
                    if (arr[i][k] == 1) {
                        flag = false
                        break;
                    }
                }
                if(!flag){
                    i++;
                    j++;
                }
                if(flag){
                    for (let k = i + 1; k < 8; k++) {
                        if (arr[k][j] == 1) {
                            flag = false;
                            break
                        }
                    }
                }
                if (flag) {
                    arr[i][j] = 1;
                } else{
                    break;
                }
            }
        }
    }
    console.log(arr)
}
checkConflict(arr)
