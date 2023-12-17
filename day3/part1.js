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
        // if (index > 5) return
        cursor.cur = parseRow(row);
        cursor.next = rows[index] ? parseRow(rows[index]) : null;
        if (index > 1) {
            cursor.prev = parseRow(rows[index - 2]);
        }
        if (index === rows.length) {
            cursor.next = null;
        }

        // console.info(row, cursor);

        const numbersBoxes = detectNumber(cursor);
        console.info(row, numbersBoxes);
        for(const box of numbersBoxes) {
            let isValid = false;
            if (hasSymbol(cursor.prev, box)) isValid = true;
            if (hasSymbol(cursor.cur, box)) isValid = true;
            if (hasSymbol(cursor.next, box)) isValid = true;
            // console.info(row, box);
            if (isValid) {
                count += box.term;
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
        if (char === '.') return false;
        return true;
    });
}

function detectNumber(cursor) {
    let start = -1;
    let end = -1;
    let index = 0;
    const boxes = [];
    for(const char of cursor.cur) {
        if (typeof char !== 'boolean') {
            if (start === -1) {
                start = index;
            }
        }
        else if (start !== -1) {
            end = index;
            boxes.push({
                term: parseInt(cursor.cur.slice(start, end).join(''), 10),
                from: start > 0 ? start - 1 : 0,
                to: end < cursor.cur.length - 1 ? end + 1 : end
            });
            start = -1;
        }
        index++;
    }
    // If last char
    if (start !== -1) {
        boxes.push({
            term: parseInt(cursor.cur.slice(start, cursor.cur.length).join(''), 10),
            from: start > 0 ? start - 1 : 0,
            to: cursor.cur.length
        });
    }
    return boxes;
}

function hasSymbol(row, box) {
    if (!row) return false;
    const partial = row.slice(box.from, box.to);
    return partial.includes(true);
}

run();