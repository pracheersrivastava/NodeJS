// const xyz = require('./people');
// console.log(xyz.people, xyz.ages);

const { people, ages } = require('./people');
console.log(people, ages);

const os = require('os');
console.log(os);
console.log(os.cpus());
console.log(os.version());
console.log(os.uptime);
console.log(os.uptime());
console.log(os.platform(), os.homedir());