import {addCar, getAll, getById, getByMake, saveCar, removeCar } from './model.js';
import { view } from './view.js';

export async function createCar(req, res) {
    res.send(
        view('form')
    );
}

export async function deleteCar(req, res) {
    const id = parseInt(req.params.id, 10);
    if(!id) {
        return res.status(400).send('Invalid car ID');
    }

    const car = await getById(id);
    if(!car) {
        return res.status(404).send('Car not found');
    } 

    await removeCar(car);
    res.redirect('/cars'); 
}

export async function editCar(req, res) {
    const id = parseInt(req.params.id, 10);
    if(!id) {
        return res.status(400).send('Invalid car ID');
    }

    const car = await getById(id);
    if(!car) {
        return res.status(404).send('Car not found');
    } 
    res.send(
        view('form', car)
    );
}  


export async function listCars(req,res){
    const cars = await getAll();
    res.send(
        view('list', {
            cars,
            title: 'Car List'
        })
    );
}

export async function showCar(req, res) {
    const id = parseInt(req.params.id, 10);

    if(id) {
        const car = await getById(id);

        if(!car){
            res.status(404).send(view('show', { car: null }));     
        } else{
            res.send(
                view('show', {car})
            );  
        }
    }
    else {
        const found = await getByMake(req.params.id);

        if(found.length === 0) {
            res.status(404).send(view('show', { car: null })); 
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

export async function storeCar(req, res) {
    const { make, model, year } = req.body;

    if (make && model && year) {
        await addCar({
            make,
            model,
            year
        });
        res.redirect('/cars');
    } else {
        res.redirect('/cars/create');
    }
    console.log("Received body:", req.body);
}


export async function updateCar(req, res) {
    const id = parseInt(req.params.id, 10);
    if(!id) {
        return res.status(400).send('Invalid car ID');
    }

    const car = await getById(id);
    if(!car) {
        return res.status(404).send('Car not found');
    }

    const { make, model, year } = req.body;

    if (make && model && year) {
        car.make = make;
        car.model = model;
        car.year = year;

        await saveCar(car);
        res.redirect(`/cars/${id}`);
    } else {
        res.redirect(`/cars/${id}/edit`);}
   }