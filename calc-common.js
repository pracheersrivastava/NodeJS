const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function prompt() {
    rl.question('Enter a simple equation: ', (input) => {
        if(input === 'exit') {
            rl.close();
            return;
        }
        try{
            const value = eval(input);
            console.log(value);
        } catch (error) {
            console.error('I dont know how to do that.');
        }
        prompt();
    });
}

prompt();
