let id = 1;
function getId() {
    return id++;
}

const cars =  [
    {id : getId(), make: 'Toyota', model: 'Corolla', year: 2020},
    {id : getId(), make: 'Honda', model: 'Civic', year: 2019},
    {id : getId(), make: 'Ford', model: 'Mustang', year: 2021},
    {id : getId(), make: 'Chevrolet', model: 'Camaro', year: 2022},
    {id : getId(), make: 'Nissan', model: 'Altima', year: 2020},
    {id : getId(), make: 'Nissan', model: 'GTR', year: 2020},
]

export function addCar({make, model, year}) {
    const Car = {
        id: getId(),
        make,
        model,
        year
    };

    cars.push(Car);

    console.log("Added car:", Car);

    return Promise.resolve(Car);
}

export function getAll() {
    return Promise.resolve(cars);
}


export function getById(id) {
    const car = cars.find(c => c.id === id);

    return Promise.resolve(car);
}  
export function getByMake(make) {
    const found = cars.filter(c => c.make.toLowerCase() === make.toLowerCase());

    return Promise.resolve(found);
}   

export function removeCar(car) {
    const index = cars.indexOf(car);

        cars.splice(index, 1);

    return Promise.resolve(true);
}   


export function saveCar({make, model, year}) {

    return Promise.resolve(true);
}