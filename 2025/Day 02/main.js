const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');


const ranges = input.split(",");

let invalidSum = 0;
let invalidMultipleSum = 0;

for (const range of ranges) {
    const [start, end] = range.split("-");

    for (let i = +start; i <= +end; i++) {
        if (isInvalid(i)) invalidSum += i;
        if (isInvalidMultiple(i)) invalidMultipleSum += i;
    }

}

function isInvalid(number) {
    number = number.toString();

    const halfLength = number.length / 2;
    for (let i = 0; i < halfLength; i++) {

        if (number[i] != number[halfLength + i]) return false;

    }
    
    return true;
}


function isInvalidMultiple(number) {
    number = number.toString();

    let sequence = number[0];
    let i;

    for (i = 1; i < number.length - sequence.length; i++) {
        const partToCheck = number.slice(i, i + sequence.length);

        if (partToCheck == sequence) {
            i += sequence.length - 1;
            
            continue;
        }

        sequence = number.slice(0, i + 1);
    }

    if (sequence.length > number.length / 2) return false;
    const lastPart = number.slice(i, i + sequence.length);
    if (lastPart != sequence) return false;

    return true;

}

console.log("Invalid sum:", invalidSum);

console.log("Invalid multiple sum:", invalidMultipleSum);