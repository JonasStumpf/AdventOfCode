
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');





/* A1 */
const multiplications = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
let sumMults = 0;

for (const mult of multiplications) {
    const nums = mult.match(/[0-9]+/g);
    sumMults += nums[0] * nums[1];
}
console.log(sumMults);



/* A2 */
const instructions = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)/g);
let sumInstructions = 0;

for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    
    if (instruction == "don't()") {
        while (instructions[i] != "do()") i++;
        continue;
    }

    if (instruction == "do()") continue;
    
    const nums = instruction.match(/[0-9]+/g);
    sumInstructions += nums[0] * nums[1];
}
console.log(sumInstructions);
