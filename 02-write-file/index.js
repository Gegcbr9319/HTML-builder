const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');
const stream = fs.WriteStream(file);
const process = require('process');

process.stdout.write('Привет, это тест, пиши для сохранения?\n');

process.stdin.on('data', input => {
  if (input.toString().trim() === 'exit') process.exit();
  stream.write(input.toString());
});

process.on('exit', () => process.stdout.write('Пока! Текст в файле'));
process.on('SIGINT', process.exit);
