// In CommonJS, the __filename and __dirname variables are available in every module. They are global variables that provide the absolute path to the current module file and the directory that contains it, respectively.

// __filename //C:\Users\user\Desktop\node-js\feed-manager.js
// __dirname //C:\Users\user\Desktop\node-js


// In ECMA Script, the __filename and __dirname variables are not available by default. However, you can create them using the following code:
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { access, constants, readFile, writeFile } from 'fs/promises'; 
import { write } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonFile = join(__dirname, 'feeds.json');

export async function getLinks() {
    try{
        await access(jsonFile, constants.F_OK);
    } catch (error) {
        await writeFile(jsonFile, JSON.stringify([]));  //using utf-8
    }

    const contents = await readFile(jsonFile, { encoding: 'utf-8' });

    return JSON.parse(contents);
}

export async function saveLinks(links) {
    await writeFile(jsonFile, JSON.stringify(links));
}