import { trainingProcess } from "./data-process.js";

const dbTraining = trainingProcess('./assets/training-sample-minor.txt', false);
console.log(dbTraining);

const n = 0.2;

const counters = {
    hits: 0,
    sampleIndex: 0,
}
const sampleRecord = dbTraining[counters.sampleIndex];

const attributeNumber = sampleRecord.attributes.length;

let wArray = Array.from({ length: attributeNumber },);

console.log(wArray);
while (counters.hits < dbTraining.length) {

    if (counters.sampleIndex >= dbTraining.length)
        counters.sampleIndex = 0;

    const record = dbTraining[counters.sampleIndex];

    // getting u(x) value
    let u = 0;
    for (let index = 0; index < record.attributes.length; index++) {
        u = record.attributes[index] * wArray[index] + u;
    }


    // a(x) and y value
    // if a(x) >= 0 then 1 otherwise -1 
    // if a(x) == 1 then y == 2, if a(x) -1 then y == 1

    let y = 0;
    if (u >= 0)
        y = 2;
    else
        y = 1;

    if (record.classType - y == 0)
        counters.hits++;
    else {
        counters.hits = 0;

        // update w values
        // wi + n*xi(d-y)
        wArray = wArray.map((item, index) => {
            return item + (n * record.attributes[index] * (record.classType - y))
        })
    }



    console.log(counters.hits);
    counters.sampleIndex++;
}


//Y = (-w1x -w0)/w2
//X = (-w0 * w2)  / (w2 * w1)
 