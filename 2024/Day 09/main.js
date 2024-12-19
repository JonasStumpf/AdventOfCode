
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');


function getId(index) {
    return index / 2;
}
function isFile(index) {
    return (index % 2) == 0;
}

/* A1 */
moveSingleFiles();
function moveSingleFiles() {
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
    
    function getLastFileIndex(to) {
        for (let i = diskMap.length - 1; i > to; i--) {
            if (diskMap[i] != 0 & isFile(i)) return i;
        }
        return false;
    }
}


/* A2 */
moveFileBlocks();
function moveFileBlocks() {
    const initialDiskMap = input.split("").map(el=>+el);
    const diskMap = [...initialDiskMap];
    
    let sum = 0;
    for (let i = diskMap.length - 1; i >= 0; i--) {
        
        if (!isFile(i) || diskMap[i] == 0) continue;
        const freeSpace = getFreeSpace(diskMap[i], i);
        let pos;

        if (!freeSpace) { //don't move file block
            pos = getPosition(i);
        } else { //move file block
            pos = getPosition(freeSpace); //get pos first so its calculated correctly
            diskMap[freeSpace] -= diskMap[i];
        }
        
        while (diskMap[i] > 0) {
            sum += pos * getId(i);
            diskMap[i]--;
            pos++;
        }

    }
    console.log("Move File Blocks", sum);
    

    function getFreeSpace(min, to) {
        for (let i = 0; i < to; i++) {
            if (!isFile(i) && diskMap[i] >= min) return i;
        }
        return false;
    }

    function getPosition(index) {
        let pos = 0;
        for (let i = 0; i < index; i++) {
            pos += initialDiskMap[i];
        }
        return pos + initialDiskMap[index] - diskMap[index];
    }


}
