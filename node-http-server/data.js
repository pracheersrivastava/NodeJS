let id = 1;
function newID() {
    return id++;
}

const cars =  [
    {id : newID(), make: 'Toyota', model: 'Corolla', year: 2020},
    {id : newID(), make: 'Honda', model: 'Civic', year: 2019},
    {id : newID(), make: 'Ford', model: 'Mustang', year: 2021},
    {id : newID(), make: 'Chevrolet', model: 'Camaro', year: 2022},
    {id : newID(), make: 'Nissan', model: 'Altima', year: 2020},
];

export const getCars = () => {
    return cars;
}
export function saveCars(car) {
    car.id = newID();
    cars.push(car);
}

export function deleteCar(id) {
    let index = cars.findIndex(car => car.id == id);
    cars.splice(index, 1);
}