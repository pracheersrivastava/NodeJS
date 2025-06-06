    const http = require('http');
    const fs = require('fs');
    const _ = require('lodash');

    const server = http.createServer((req, res) => {
        // console.log(req.url, req.method);

        //lodash

        const num = _.random(0, 20);    
        console.log(num);

        const greet = _.once(() => {
            console.log('Hello');
        });
        greet();
        // greet(); //not registered

        let path = './views/';
        switch (req.url) {
            case '/':
            case '/home':
            case '/index':
                path += 'index.html';
                res.statusCode = 200;
                break;
            case '/about':
                path += 'about.html';
                res.statusCode = 200;
                break;
                //Redirect
            case '/about-me':
                res.statusCode = 301;
                res.setHeader('Location', '/about');
                res.end();           
                return;
            default:
                path += '404.html';
                res.statusCode = 404;
                break;

        }

        // set header content type
        res.setHeader('Content-Type', 'text/html');
        // res.write('<head><link rel="stylesheet" href="#"></head>');
        // res.write('<h1>Hello, World!</h1>');
        // res.write('<h2>Hello There!</h2>');
        // res.end();

        //send an html file
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err);
                res.end();
            }
            else {
                // res.write(data);
                res.end(data);
            }
        });
    });

    server.listen(3000, 'localhost', () => {
        console.log('listening for requests on port 3000');
    })

