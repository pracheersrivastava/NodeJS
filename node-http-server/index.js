import { createServer, request } from 'http';
import {deleteCar, getCars, saveCars} from './data.js';   
import { create } from 'domain';
import { createList, getCarContent, view, getForm } from './content.js';
import {parse} from 'querystring';  
import {readFile} from 'fs/promises';
import { stat } from 'fs';

const server = createServer(async (req, res) => {
    // /add
    const parts = req.url.split('/');
    const cars = getCars();

    if (req.method === 'POST') {
        let body = '';
    req.on('readable', () => {
        const data = req.read();
        if (data) {
            body += data;
        }
    });
    req.on('end', () => {
        const cars = parse(body);
        
        saveCars({
            make: cars.make,
            model: cars.model,
            year: cars.year,
        });
        redirect(res, '/'); 
    });

    } else { //GET
        if (parts.includes('delete')) {
            handleDelete(parts[2]);
            redirect(res, '/');
        } else if (req.url === '/assets/css/style.ss') {
            try{
                const cssFileName = './public/assets/css/style.css';
                const css = await readFile(cssFileName, {encoding : 'utf-8'});

                res.end(css);
            } catch (err) {
                res.statusCode(404);
                res.end();
            }
        } else {
            const url = new URL(req.url, `http://localhost`);
            const id = url.searchParams.get('id');
            res.writeHead(200, { 'Content-Type': 'text/html', "charset": "utf-8" });

            let contents = ''
            if (parts.includes('add')) {
                contents = getForm();
            } else if (id) {
                let car = cars.find(car => car.id == id);
                contents = getCarContent(id, cars);
            } else {
                contents = createList(cars);
            }
            res.end(view(contents));
        }
    }
});



function handleDelete(id) {
    deleteCar(id);
}

function redirect(response, to) {
    response.writeHead(302, {Location: to, 'Content-Type': 'text/plain'});
    response.end(`Redirecting to ${to}`);
}

server.listen(80, () => {
    console.log(`Server is running on localhost:${server.address().port}`);
});