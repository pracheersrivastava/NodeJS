import express from 'express';
import {routes as carRoutes} from './cars/routes.js';

const app = express();

app.use(express.static('./public'));

app.use('/cars', carRoutes);

app.get('/', (req,res) => {
    res.send('Home Page')
});


app.get('/sum/:a/:b', (req,res) => {
    res.send(`${parseInt(req.params.a) + parseInt(req.params.b)}`);
})

app.get('/product  /:a/:b', (req,res) => {
    res.send(`${parseInt(req.params.a) * parseInt(req.params.b)}`);
})

app.get('/greet',(req,res) => {
    res.send("Hello, this is a greeting endpoint!");
}) 


export function start(){
    app.listen(80, () => {
        console.log('Listening on port 80');
    });
}