const path = require('path');
const fs = require('fs');

const filess = path.join(__dirname, 'files');
const filesCopy = path.join(__dirname, 'files-copy');

fs.rm(filesCopy,{recursive:true}, (err) => {
  if(err) throw err;
  console.log('Folder deleted');
    
});

fs.mkdir(filesCopy,{recursive:true}, (err) =>{
  if(err) throw err;
  else {
    fs.readdir(filess,{withFileTypes: true}, (err, files) =>{
      if(err) throw err;
      else{
        files.forEach(file => {
          if (file.isFile()) {
            const a = `${filess}/${file.name}`;
            const b = `${filesCopy}/${file.name}`;
            fs.copyFile(a,b, err =>{
              if(err) throw err;
            });
          }
        });    
      }
    
    });    
  }
});


