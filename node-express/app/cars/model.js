const cars =  [
    {id : 1, make: 'Toyota', model: 'Corolla', year: 2020},
    {id : 2, make: 'Honda', model: 'Civic', year: 2019},
    {id : 3, make: 'Ford', model: 'Mustang', year: 2021},
    {id : 4, make: 'Chevrolet', model: 'Camaro', year: 2022},
    {id : 5, make: 'Nissan', model: 'Altima', year: 2020},
    {id : 6, make: 'Nissan', model: 'GTR', year: 2020},
]

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