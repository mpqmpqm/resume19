const questions = [
    `A: `,
    `B: `,
    `C: `
]

const ask = (i=0) => {
    process.stdout.write(`\n${questions[i]}`);
}

ask ();

const answers = [];

process.stdin.on(`data`, data => {
    
    if (data.toString().trim()==`stop`){
        console.log(`Final: ${answers}`);
        process.exit();
    }

    answers.push (data.toString().trim())

    ask (answers.length);

    // console.log(answers);

    
    // process.stdout.write(`\n${data.toString().trim()}\n`);
    // // process.exit();
})