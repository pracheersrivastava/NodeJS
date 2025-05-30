const views = {
    loginForm(){
        return this._layout(`
            <form method="POST" action=/login>
                <div>
                    Username: <input type="text" name="username" />
                </div>
                <div>
                    Password: <input type="password" name="password" />
                </div>
                <div>
                    <button type="submit">Sign In</button>
                </div>
            </form>
        `);
    },              
    list({cars, title}){
        const liElements = cars.map(({id, make, model, year}) =>
            `<li><a href="/cars/${id}">${make} ${model} (${year})</a></li>`);

        return  this._layout(`
            <h2>${title}</h2>
            <ul>
                ${liElements.join('')}
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