
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');


class Map {
    map;
    
    getField(pos) {
        return this.map[pos.y] ? this.map[pos.y][pos.x] : false;
    }
    setField(pos, val) {
        this.map[pos.y][pos.x] = val;
    }

    constructor(mapString) {
        this.map = mapString.split("\n").map(el=>el.trim());
        for (let i = 0; i < this.map.length; i++) {
            this.map[i] = this.map[i].split("");
        }
    }

    print() {
        let mapString = "";
        let row = 0;
    
        this.loop((y, x)=>{
            if (row != y) {
                row = y;
                mapString += "\n";
            }
            mapString += this.map[y][x];
        });
    
        console.log(mapString);
    }

    loop(callback) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const cb = callback(y, x);
                if (cb) return cb;
            }
        }
    }
}

class Guard {
    static states = {
        "^": 0,
        ">": 1,
        "v": 2,
        "<": 3
    }
    getNewPos = {
        0: (y, x)=>{return {y: y-1, x}},
        1: (y, x)=>{return {y, x: x+1}},
        2: (y, x)=>{return {y: y+1, x}},
        3: (y, x)=>{return {y, x: x-1}},
    }

    state;
    pos;

    constructor(state, pos) {
        this.state = state;
        this.pos = pos;
    }

    simulateWalking() {
        while(map.getField(this.pos)) {
            this.walk();
        }
    }

    walk() {
        const newPos = this.getNewPos[this.state](this.pos.y, this.pos.x);
        if (map.getField(newPos) == "#") {
            this.turn();
            return;
        }
        map.setField(this.pos, "X");
        this.pos = newPos;
    }

    turn() {
        this.state = (this.state + 1) % Object.keys(Guard.states).length;
    }
}

const map = new Map(input);
//map.print();

const guard = map.loop((y, x)=>{
    if (Guard.states[map.getField({y, x})] !== undefined) return new Guard(Guard.states[map.getField({y, x})], {y, x});
});
guard.simulateWalking();

//console.log("----");
//map.print();

let walkedFields = 0;
map.loop((x, y)=>{
    if (map.getField({y, x}) == "X") walkedFields++;
});
console.log(walkedFields);


