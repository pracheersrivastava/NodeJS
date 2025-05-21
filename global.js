// Global Objects


console.log(global);

global.setTimeout(() => {
   console.log("5 seconds later.");
   clearInterval(interval);
}, 5000);

const interval = setInterval(() => {
    console.log("1 second later.");
}, 1000);


console.log(__dirname);
console.log(__filename);