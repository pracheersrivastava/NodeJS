import * as readline from 'readline';
import { stdin as input, stdout as output} from 'process';

const rl = readline.createInterface({input, output});
// function prompt() {
//     rl.question('Enter a siimple equation: ', (input) => {
//         if(input === 'exit') {
//             rl.close();
//             return;
//         }
//         try{
//             const value = eval(input);
//             console.log(value);
//         } catch (error) {
//             console.error('I dont know how to do that.');
//         }
//         prompt();
//     });
// }

// prompt();


function question(query){
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

let answer = await question('Enter a simple equation: ');
while(answer !== 'exit') {
    try{
        const value = eval(answer);
        console.log(value);
    }
    catch (error) {
        console.error('I dont know how to do that.');
    }   
    answer = await question('Enter a simple equation: ');
}
rl.close();