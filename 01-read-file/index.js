const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');
const stream = fs.ReadStream(file);
stream.on ('data', data =>{
    console.log(data.toString());
});