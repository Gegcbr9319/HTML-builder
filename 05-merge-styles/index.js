const path = require('path');
const fs = require('fs');
const fss = require('fs/promises');

const styleFile = path.join(__dirname, 'project-dist', 'bundle.css');
const styleFolder = path.join(__dirname, 'styles');

const stream = fs.WriteStream(styleFile);

fss.readdir(styleFolder,{withFileTypes: true})
  .then(files => { 
    for (const file of files) {
      const pathToFile = `${styleFolder}/${file.name}`; 
      if (file.isFile()){
        const{ext} = path.parse(pathToFile);
        if(ext === '.css'){
          const read = fs.createReadStream(pathToFile, 'utf-8');
          read.on('data', (data) => stream.write(data) );
        }
      }  
    }});

