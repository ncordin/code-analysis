const writeJsonFile = require('write-json-file');
const reducers = require('./reducers');
const scan = require('./utilities/scan');

const [, , projectPath] = process.argv;

if (!projectPath) {
  console.error('\n*** Failed! ***\n\nUsage: <ProjectPath>\n');
  process.exit(0);
}

function scanWithReducer(projectPath, reducerName, reducer) {
  console.log(`generating ${reducerName} report...`);

  return scan(projectPath, ['**/*.js', '**/*.html'], reducer).then(report => {
    console.log(`✓ ${reducerName} done`);
    return {name: reducerName, content: report};
  });
}

const scanProject = projectPath => {
  const scanPromises = [];

  Object.keys(reducers).forEach(reducerName => {
    const reducer = reducers[reducerName];
    const promise = scanWithReducer(projectPath, reducerName, reducer);

    scanPromises.push(promise);
  });

  Promise.all(scanPromises).then(reports => {
    writeJsonFile('reports.json', reports);
    console.log('✓ all reports saved into reports.json');
  });
};

scanProject(projectPath);
