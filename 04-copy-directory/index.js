const path = require('path');
const fs = require('fs/promises');


const filess = path.join(__dirname, 'files');
const filesCopy = path.join(__dirname, 'files-copy');

async function copyDir(copy, past){
  await fs.mkdir(past,{recursive:true});
  const files =  await fs.readdir(copy,{withFileTypes:true});
  files.forEach( async file => {
    const a = `${copy}/${file.name}`;
    const b = `${past}/${file.name}`;
    if (await file.isFile()) {
      
      await fs.copyFile(a,b);
    }
    else{
      copyDir(a, b);
    }
    
  });    
}



async function delDir(){
  await fs.rm(filesCopy,{recursive:true, force:true});
}

 
async function create(){
  
  await delDir();
  await copyDir(filess, filesCopy); 
}

create(); 