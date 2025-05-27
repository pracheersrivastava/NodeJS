const views = {
    list({cars, title}){
        const liElements = cars.map(car => `<li><a href="/cars/${car.id}">${car.make} ${car.model} (${car.year})</a></li>`).join('');

        return  this._layout(`
            <h2>${title}</h2>
            <ul>
                ${liElements}
            </ul>   
        `);
    },
    show({car}){
        if(!car) {
            return this._layout('<h1>Car not found</h1>');
        }
        return this._layout(`
            <h1>${car.make} ${car.model} (${car.year})</h1>
            <p>ID: ${car.id}</p>
        `);
    },
    _layout(content){
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
}

export const view = (name, data) => views[name](data);  