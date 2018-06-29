const writeJsonFile = require('write-json-file');
const reducers = require('./reducers');
const scan = require('./utilities/scan');
const {addHistory} = require('./utilities/reports');
const {resolveObjectOfPromises} = require('./utilities/promise');

const [, , projectPath] = process.argv;

if (!projectPath) {
  console.error('\n*** Failed! ***\n\nUsage: <ProjectPath>\n');
  process.exit(0);
}

function scanWithReducer(projectPath, reducerName, reducer) {
  console.log(`generating ${reducerName} report...`);

  return scan(projectPath, ['**/*.js', '**/*.html'], reducer).then(report => {
    console.log(`✓ ${reducerName} done`);
    return report;
  });
}

const scanProject = projectPath => {
  const scanPromises = {};

  Object.keys(reducers).forEach(reducerName => {
    const reducer = reducers[reducerName];
    const promise = scanWithReducer(projectPath, reducerName, reducer);

    scanPromises[reducerName] = promise;
  });

  resolveObjectOfPromises(scanPromises).then(reports => {
    addHistory(reports).then(reportsWithHistory => {
      writeJsonFile('reports.json', reportsWithHistory);
      console.log('✓ all reports saved into reports.json');
    });
  });
};

scanProject(projectPath);
