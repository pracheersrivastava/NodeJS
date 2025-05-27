import {getAll, getById, getByMake} from './model.js';
import { view } from './view.js';


export async function listCars(req,res){
    const cars = await getAll();
    res.send(
        view('list', {
            cars,
            title: 'Car List'})
    );
}

export async function showCar(req, res) {
    const id = parseInt(req.params.id, 10);

    if(id) {
        const car = await getById(id);

        if(!car ){
            res.send(404);   
        } else{
            res.send(
                view('show', {car})
            );  
        }
    }
    else {
        const found = await getByMake(req.params.id);

        if(found.length === 0) {
            res.send(404); 
        } else {
            res.send(
                view('list', {
                    cars: found,
                    title: `Cars by ${found[0].make}`
                })          
            );
        }
    }
}