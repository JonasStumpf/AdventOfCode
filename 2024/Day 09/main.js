
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');


/* A1 */
const diskMap = input.split("");

let sum = 0;
let position = 0;
for (let i = 0; i < diskMap.length; i++) {
    
    if (isFile(i)) {

        while (diskMap[i] > 0) {
            sum += position * getId(i);
            position++;
            diskMap[i]--;
        }

    } else { //free space, get file from end

        let lastFileIndex = getLastFileIndex(i);
        
        while (diskMap[i] > 0 && lastFileIndex) {
            sum += position * getId(lastFileIndex);
            position++;
            diskMap[i]--;
            diskMap[lastFileIndex]--;
            if (diskMap[lastFileIndex] == 0) lastFileIndex = getLastFileIndex(i);
        }

    }

}
console.log("Move Single Files", sum);

function getId(index) {
    return index / 2;
}
function getLastFileIndex(to) {
    for (let i = diskMap.length - 1; i > to; i--) {
        if (diskMap[i] != 0 & isFile(i)) return i;
    }
    return false;
}

function isFile(index) {
    return (index % 2) == 0;
}