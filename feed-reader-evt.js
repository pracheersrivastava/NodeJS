import { getLinks, saveLinks } from './feed-manager.js';
import { rl, close } from './rl.js';
// import https from 'https'
import axios from 'axios';
import Parser from 'rss-parser';    
import { EventEmitter } from 'events';

const feeds = await getLinks();
// let input = await question('Enter a command (list, add, del, read, quit): ');
const parser = new Parser();  
const emitter = new EventEmitter();


function prompt() {
    rl.setPrompt('Enter a command (list, add, del, read, quit): ');
    rl.prompt();
}
rl.on('line', async (input) => {
    let cmdParts = input.trim().split(' ');
    emitter.emit(cmdParts[0], cmdParts[1]);
});


emitter.on('quit', async() => {
    await saveLinks(feeds);
    close();
});

emitter.on('list', async() => {
    feeds.forEach((url, index) => {
            console.log(`${index}\t${url}`);
    });
    prompt();
});

emitter.on('add', async(url) => {
    if (!url) {
        console.log('Please include URL with add command');
    } else {
        feeds.push(url);
        console.log(`Added: ${url}`);
    }
    prompt();
});

emitter.on('del', async(index) => {
    if (!index) {
        console.log('Please include the index of the URL to delete');
    } else {
        index = parseInt(index, 10);

        if (index > -1 && index < feeds.length) {
            let deleted = feeds.splice(index, 1);
            console.log(`Deleted: ${deleted}`);
        } else {
            console.log('Invalid index');
        }
    }
    prompt();
});

emitter.on('read', async(index) => {
    if (!index) {
        console.log('Please include the index of the URL to read');
    } else {
        index = parseInt(index, 10);

        if (index > -1 && index < feeds.length) {
            let {data} = await axios.get(feeds[index]);
            let feed = await parser.parseString(data);
            feed.items.forEach((item) => {
                console.log(item.title);
            });
        } else {
            console.log('Index is out of range');
        }
    }
    prompt();
});

prompt(); 


// while(input !== 'quit') {

//     //list
//     let cmdParts = input.trim().split(' ');
//     let cmd = cmdParts[0];

//     if (cmd === 'list') {
//         feeds.forEach((url, index) => {
//             console.log(`${index}\t${url}`);
//         });
//     }
//     //add url
//     if (cmd === 'add') {
//         if (cmdParts.length < 2) {
//             console.log('Please include URL with add command');
//         } else {
//             feeds.push(cmdParts[1]);
//             console.log(`Added: ${cmdParts[1]}`);
//         }
//     }
//     //del index
//     if (cmd === 'del') {
//     if (cmdParts.length < 2) {
//         console.log('Please include the index of the URL to delete');
//     } else {
//         let index = parseInt(cmdParts[1], 10);

//         if (index > -1 && index < feeds.length) {
//             let deleted = feeds.splice(index, 1);
//             console.log(`Deleted: ${deleted}`);
//         } else {
//             console.log('Invalid index');
//         }
//     }
//     }
//     //read index
//     // if (cmd === 'read') {
//     //    https.get('https://www.reddit.com/r/node.rss', (response) => {
//     //     let content = '';
//     //     response.on('data', (chunk) => {
//     //         content += chunk;
//     //     });

//     //     response.on('end', () => {
//     //         console.log(content);
//     //     });
//     //    })
//     // }
//     if (cmd === 'read') {
//         if (cmdParts.length < 2) {
//             console.log('Please include the index of the URL to read');
//         } else {
//             let index = parseInt(cmdParts[1], 10);

//             if (index > -1 && index < feeds.length) {
//                 let {data} = await axios.get('https://www.reddit.com/r/node.rss')
//                 let feed = await parser.parseString(data);
//                 feed.items.forEach((item) => {
//                 console.log(item.title);
//                 });
//             } else {
//                 console.log('Index is out of range');
//             }
//         }
//     }

//     input = await question('Enter a command (list, add, del, read, quit): ');
// }

// await saveLinks(feeds);
// close();