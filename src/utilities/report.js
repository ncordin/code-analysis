const writeJsonFile = require('write-json-file');

const writeReportIntoFile = (projectPath, fileName, report) => {
  const file = projectPath + '/' + fileName + '.json';
  writeJsonFile(file, report).then(() => {
    console.log('done');
  });
};

module.exports = writeReportIntoFile;
