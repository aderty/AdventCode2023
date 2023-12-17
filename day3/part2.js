import fs from 'fs';

async function run() {
    const rows = fs.readFileSync(`day3/input.txt`).toString().split(`\n`);
    let count = 0;
    let index = 1;

    const cursor = {
        prev: null,
        cur: null,
        next: null
    }

    for(const row of rows) {
        // if (index > 3) return
        cursor.cur = parseRow(row);
        cursor.next = rows[index] ? parseRow(rows[index]) : null;
        if (index > 1) {
            cursor.prev = parseRow(rows[index - 2]);
        }
        if (index === rows.length) {
            cursor.next = null;
        }

        // console.info(row, cursor);

        const gearsBoxes = detectGear(cursor);

        // console.info(row, gearsBoxes);
        for(const box of gearsBoxes) {
            let valid = 0;
            let numbers = [];
            let validity = hasNumber(index, cursor.prev, box);
            if (validity.count) {
                valid += validity.count;
                numbers.push(...validity.numbers);
            }
            validity = hasNumber(index, cursor.cur, box);
            if (validity.count) {
                valid += validity.count;
                numbers.push(...validity.numbers);
            }
            validity = hasNumber(index, cursor.next, box);
            if (validity.count) {
                valid += validity.count;
                numbers.push(...validity.numbers);
            }
            // console.info(row, box, valid);
            if (valid === 2) {
                console.info(index, numbers);
                count += (numbers[0] * numbers[1]);
            }
        }

        // console.info(id, MIN_GAME)
        // count += (MIN_GAME.red * MIN_GAME.green * MIN_GAME.blue);
        index++;
    }
    console.info(count);
}

function parseRow(row) {
    return Array.from(row).map(char => {
        if (['0','1','2','3','4','5','6','7','8','9'].includes(char)) {
            return char;
        }
        if (char === '*') return true;
        return false;
    });
}

function detectGear(cursor) {
    let start = -1;
    let end = -1;
    let index = 0;
    const boxes = [];
    for(const char of cursor.cur) {
        if (char === true) {
            boxes.push({
                from: index > 0 ? index - 1 : 0,
                to: index < cursor.cur.length - 1 ? index + 1 : index
            });
        }
        index++;
    }
    return boxes;
}

function hasNumber(rang, row, box) {
    if (!row) return { isValid: false };
    const partial = row.slice(box.from > 0 ? box.from : 0, box.to < row.length -1 ? box.to + 1 : row.length);
    let count = partial.filter(p => ['0','1','2','3','4','5','6','7','8','9'].includes(p)).length;
    const second = ['0','1','2','3','4','5','6','7','8','9'].includes(row[box.from + 1]);
    if (count === 3) count = 1;
    if (count === 2 && second) count = 1;

    let numbers = [];

    let index = 0;
    let num = [];
    for (const char of row) {
        if (typeof char !== 'boolean') {
            if (index <= box.to || num.length) num.push(char);
        }
        else {
            if (index > box.from && num.length) {
                numbers.push(parseInt(num.join(''), 10));
            }
            num = [];
        }
        index++;
    }
    if (num.length) {
        numbers.push(parseInt(num.join(''), 10));
    }

    // if (rang === 4) {
    //     console.info(box, partial, numbers)
    // }

    return {
        count,
        numbers
    }
}

run();