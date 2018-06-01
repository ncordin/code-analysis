const writeReportIntoFile = require('./utilities/report');
const reducers = require('./reducers');
const scan = require('./utilities/scan');

const [,, projectPath] = process.argv;

if (!projectPath) {
  console.log('\n\nFailed!\nUsage: <ProjectPath>\n\n\n');
  process.exit(-1);
}

const scanWithReducer = (projectPath, reducerName, reducer) => {
  console.log(`generating ${reducerName} report...`);
  scan(projectPath, ['**/*.js', '**/*.html'], reducer).then(report => {
    writeReportIntoFile(projectPath, reducerName, report);
  });
};

const scanProject = (projectPath) => {
  Object.keys(reducers).forEach(reducerName => {
    const reducer = reducers[reducerName];
    scanWithReducer(projectPath, reducerName, reducer);
  });
};

scanProject(projectPath);
