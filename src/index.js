const reducers = require("./reducers");
const scan = require("./utilities/scan");
const { resolveObjectOfPromises } = require("./utilities/promise");

const [, , projectPath] = process.argv;

// ../webapp-mobile/app
// ../webapp-desktop/app

if (!projectPath) {
  console.error("\n*** Failed! ***\n\nUsage: <ProjectPath>\n");
  process.exit(0);
}

function scanWithReducer(projectPath, reducerName, reducer) {
  console.log(`generating ${reducerName} report...`);

  return scan(projectPath, ["**/*.js", "**/*.jsa", "**/*.html"], reducer).then(
    (report) => {
      console.log(`✓ ${reducerName} done`);
      return report;
    }
  );
}

const scanProject = (projectPath) => {
  const scanPromises = {};

  Object.keys(reducers).forEach((reducerName) => {
    const reducer = reducers[reducerName];
    const promise = scanWithReducer(projectPath, reducerName, reducer);

    scanPromises[reducerName] = promise;
  });

  resolveObjectOfPromises(scanPromises).then((reports) => {
    const total =
      reports.summarize.react.lines +
      reports.summarize.angular.lines +
      reports.summarize.native.lines;
    const angularRatio = reports.summarize.angular.lines / total;
    const migrationPourcent = Math.round((1 - angularRatio) * 10000) / 100;

    console.log(`✓ ${migrationPourcent}% of migration done.`);
  });
};

scanProject(projectPath);
