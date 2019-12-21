const readLine = require(`readline`);

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question (`A? `, answer => {
    console.log(`A!`);
});

