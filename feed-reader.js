import { getLinks, saveLinks } from './feed-manager.js';
import { question, close } from './rl.js';
const feeds = await getLinks();
let input = await question('Enter a command (list, add, del, read, quit): ');  

while(input !== 'quit') {

    //list
    let cmdParts = input.trim().split(' ');
    let cmd = cmdParts[0];

    if (cmd === 'list') {
        feeds.forEach((url, index) => {
            console.log(`${index}\t${url}`);
        });
    }
    //add url
    if (cmd === 'add') {
        if (cmdParts.length < 2) {
            console.log('Please include URL with add command');
        } else {
            feeds.push(cmdParts[1]);
            console.log(`Added: ${cmdParts[1]}`);
        }
    }
    //del index
    if (cmd === 'del') {
    if (cmdParts.length < 2) {
        console.log('Please include the index of the URL to delete');
    } else {
        let index = parseInt(cmdParts[1], 10);

        if (index > -1 && index < feeds.length) {
            let deleted = feeds.splice(index, 1);
            console.log(`Deleted: ${deleted}`);
        } else {
            console.log('Invalid index');
        }
    }
    }
    //read index
    input = await question('Enter a command (list, add, del, read, quit): ');
}

feeds.push('https://www.tutsplus.com');
await saveLinks(feeds);
close();