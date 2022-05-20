const path = require('path');
const fs = require('fs/promises');


const filess = path.join(__dirname, 'files');
const filesCopy = path.join(__dirname, 'files-copy');

async function copyDir(){
  await fs.mkdir(filesCopy,{recursive:true});
  const files =  await fs.readdir(filess,{withFileTypes:true});
  files.forEach( async file => {
    if (await file.isFile()) {
      const a = `${filess}/${file.name}`;
      const b = `${filesCopy}/${file.name}`;
      await fs.copyFile(a,b);
    }
    
  });    
}



async function delDir(){
  await fs.rm(filesCopy,{recursive:true, force:true});
}

 
async function create(){
  
  await delDir();
  await copyDir(); 
}

create(); 