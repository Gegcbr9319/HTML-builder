const path = require('path');
const fs = require('fs');
const fss = require('fs/promises');
const { rm, mkdir, readdir } = require('fs/promises');


const projectPath = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, 'assets');
const stylePath = path.join(__dirname, 'styles');
const componentsPath = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const projectAssetsPath = path.join(projectPath, 'assets');


async function copyDir(copy, past){
  await fss.mkdir(past,{recursive:true});
  const files =  await fss.readdir(copy,{withFileTypes:true});
  files.forEach( async file => {
    const a = `${copy}/${file.name}`;
    const b = `${past}/${file.name}`;
    if (await file.isFile()) {
        
      await fss.copyFile(a,b);
    }
    else{
      copyDir(a, b);
    }
      
  });    
}

function mergeStyle() {
  const stream = fs.WriteStream(path.join(projectPath, 'style.css'));

  fss.readdir(stylePath,{withFileTypes: true})
    .then(files => { 
      for (const file of files) {
        const pathToFile = `${stylePath}/${file.name}`; 
        if (file.isFile()){
          const{ext} = path.parse(pathToFile);
          if(ext === '.css'){
            const read = fs.createReadStream(pathToFile, 'utf-8');
            read.on('data', (data) => stream.write(data) );
          }
        }  
      }});}


async function createHtml(pathTemplate, pathComponent) {
  let component = await readdir(pathComponent, {withFileTypes: true});
  component = component.filter(file => ((file.isFile()) && path.parse(path.join(pathComponent, file.name)).ext === '.html'));
  const readTemplate = fs.ReadStream(pathTemplate, 'utf-8');
  readTemplate.on('data', async data =>{
    let index = data;
    component.forEach(async (component) => {
      const readStream = await fs.ReadStream(`${pathComponent}//${component.name}`);
      await readStream.on('data', componentData => {
        index = index.replace(`{{${path.parse(pathComponent + '//' + component.name).name}}}`, componentData);
        const writeStream = fs.WriteStream(path.join(projectPath, 'index.html'));
        writeStream.write(index);
      });
    });
  } );
}








rm(projectPath, {recursive: true, force: true})
  .then(()=>{
    mkdir(projectPath);
    copyDir(assetsPath, projectAssetsPath);
    mergeStyle();   
    createHtml(templatePath, componentsPath);
  });  