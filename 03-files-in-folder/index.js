const fs = require('fs/promises');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, {withFileTypes: true})
  .then(files => {
    for (const file of files) {
      const pathToFile = `${folder}/${file.name}`;
      if (file.isFile()){
        const { ext, name } = path.parse(pathToFile);
        fs.stat(pathToFile).then(stats => {
          console.log(`${name} - ${ext.slice(1)} - ${stats.size / 1024} kb`);
        });
      }
    }
  });
