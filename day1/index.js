import fs from 'fs';

async function run() {
    const rows = fs.readFileSync(`day1/input.txt`).toString().split(`\n`);
    let count = 0;
    for(const rowIn of rows) {
        let first = 0;
        let last = 0;
        let hasFirst = false;
        let row = rowIn
        .replace(/zero/g, convert('zero'))
        .replace(/one/g, convert('one'))
        .replace(/two/g, convert('two'))
        .replace(/three/g, convert('three'))
        .replace(/four/g, convert('four'))
        .replace(/five/g, convert('five'))
        .replace(/six/g, convert('six'))
        .replace(/seven/g, convert('seven'))
        .replace(/eight/g, convert('eight'))
        .replace(/nine/g, convert('nine'));

        for(const char of row) {
            if (['0','1','2','3','4','5','6','7','8','9'].includes(char)) {
                if (!hasFirst) first = char;
                hasFirst = true;
                last = char;
            }
        }
        let lineCount = parseInt(`${first}${last}`, 10);
        console.info(rowIn, row, lineCount);
        count += lineCount;
    }
    console.info(count);
}

function convert(char) {
    switch(char) {
        case 'zero': return 'zero0zero';
        case 'one': return 'one1one';
        case 'two': return 'two2two';
        case 'three': return 'three3three';
        case 'four': return 'four4four';
        case 'five': return 'five5five';
        case 'six': return 'six6six';
        case 'seven': return 'seven7seven';
        case 'eight': return 'eight8eight';
        case 'nine': return 'nine9nine';
        default: return char;
    }
}

run();