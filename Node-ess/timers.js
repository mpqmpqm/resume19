const wait = 3000;
const interval = 500;
let total = 0;

// console.log(`Wait time = ${wait}`);

const timerOut = () => {
    console.log(`Done`)
    clearInterval(intervalFunction)};

const intervalFunction = setInterval(() => {
    total += interval;
    console.log(`Wait time = ${total}`);
}, interval);

setTimeout(timerOut, 5000);

