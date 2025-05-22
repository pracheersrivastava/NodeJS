const express = require('express');
const { get } = require('lodash');
//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);
app.get('/', (req, res) => {
    // res.send('<h1>Home Page</h1>');
        const blogs = [
        {title: 'Blog 1', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
        {title: 'Blog 2', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
        {title: 'Blog 3', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    ]

    res.render('index', { title: 'Home', blogs });
});
app.get('/about', (req, res) => {
    // res.send('<h1>About Page</h1>');
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    // res.send('<h1>Create a new blog</h1>');
    res.render('create', { title: 'Create'});
});

//404 page - use at the end as a catch all 
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
})  