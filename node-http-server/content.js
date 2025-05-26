export const createList = (cars) => `
<h2>My Cars <a href="/add">Add a new car</a></h2>
<ul>
    ${cars.map(createListItem).join('\n')}
</ul>`;

const createListItem = (item) => `<li><a href = "?id=${item.id}">${item.make} ${item.model} (${item.year}) </a></li>`;

export const getForm = () => `<h2>Add a new car</h2>
<form action="/add" method="post">
    <div>
        <label for="make">Make:</label>
        <input type="text" id="make" name="make" required>
    </div>
    <div>
        <label for="model">Model:</label>
        <input type="text" id="model" name="model" required>
    </div>
    <div>
        <label for="year">Year:</label>
        <input type="number" id="year" name="year" required>
    </div>
    <button type="submit">Add Car</button>
</form>`;

export function getCarContent (id, cars) {
    const car = cars.find(car => car.id == id);
    if (car) {
        return `<h2>${car.make} ${car.model} (${car.year})</h2>
            <p><a href = '/delete/${car.id}'>Delete</a></p>`;
    } else {
        return `<h2>Car not found</h2>`;
    }
}


export const view = (content) => {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cars</title>
                <link rel="stylesheet" href="/assets/css/style.css">
            </head>
            <body>
                ${content}
            </body>
            </html>
        `;
    
}