const express = require('express');
const { get } = require('lodash');
//express app
const app = express();

//listen for requests
app.listen(3000);
app.get('/', (req, res) => {
    // res.send('<h1>Home Page</h1>');
    res.sendFile('./views/index.html', { root: __dirname });
});
app.get('/about', (req, res) => {
    // res.send('<h1>About Page</h1>');
    res.sendFile('./views/about.html', { root: __dirname });
});


//redirect
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

//404 page - use at the end as a catch all
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})