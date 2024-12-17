
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');


const equations = input.split("\n").map(el=>el.trim().split(/:\s+|\s+/g).map(el=>+el.trim()));

const operators = {
    "add": (a, b)=>a+b,
    "mult": (a, b)=>a*b,
    "concat": (a, b)=>+`${a}${b}`
};

function checkEquation(equation, operators) {
    const numOperations = equation.length - 2; //-1 for result, -1 operations to nums

    return eval();

    function eval(level = 1, curr = equation[1]) {
        const vals = [];
        for (const operator of operators) {
            vals.push(operator(curr, equation[level + 1]));
        }

        if (level < numOperations) {

            for (const val of vals) {
                if (val > equation[0]) continue;
                const evaluated = eval(level + 1, val);
                if (evaluated) return evaluated;
            }

        } else {

            for (const val of vals) {
                if (val == equation[0]) return val;
            }

        }

        
        return 0;
    }
}

/* A1 */
let possibleAddMultEquationSum = 0;
for (const equation of equations) {
    possibleAddMultEquationSum += checkEquation(equation, [operators.add, operators.mult]);
}
console.log("Possible Add/Mult Equation Sum", possibleAddMultEquationSum);


/* A2 */
possibleAddMultConcatEquationSum = 0;
for (const equation of equations) {
    possibleAddMultConcatEquationSum += checkEquation(equation, [operators.add, operators.mult, operators.concat]);
}
console.log("Possible Add/Mult/Concat Equation Sum", possibleAddMultConcatEquationSum);
