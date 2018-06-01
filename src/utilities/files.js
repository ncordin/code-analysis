const fileSystem = require('fs');
const {FileMatcher} = require('file-matcher');

const show = (path, files) =>
  files
    .map(file => file.substring(path.length))
    .map(file => console.log(file));

const read = file =>
  new Promise((resolve, reject) => {
    fileSystem.readFile(file, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

const find = (path, patterns) =>
  new Promise((resolve, reject) => {
    const options = {
      path,
      recursiveSearch: true,
      fileFilter: {
        fileNamePattern: patterns.map(file => `**/${file}`)
      }
    };
    new FileMatcher()
      .find(options)
      .then(files => resolve(files))
      .catch(error => console.log(error));
  });

module.exports = {
  show,
  read,
  find
};
