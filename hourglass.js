'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function hourglassSum(arr) {
    let accumulator = 0;
    let position = 0;
    let control = 0;
    
    for (let i = 0; i < arr.length; i++) {
    if ((arr.length - i) >= 3) {

        while (position < arr[i].length - 1 && position < arr[i].length - 2) {
            control = position <= 3 ?
                arr[i][position] + arr[i][position + 1] + arr[i][position + 2]
                + arr[i + 1][position + 1]
                + arr[i + 2][position] + arr[i + 2][position + 1] + arr[i + 2][position + 2]
                : 0;

            accumulator = position == 0 && i == 0 ? control : accumulator;
            accumulator = accumulator <= 0 && control <= 0 && control > accumulator ? control :
                        control > accumulator ? control : accumulator;
            position++;
        }
        position = 0;
    }
    else { break; }

}
return accumulator;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result = hourglassSum(arr);

    ws.write(result + '\n');

    ws.end();
}
