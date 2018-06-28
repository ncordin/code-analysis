const moduleParser = require('../parsers/module');
const frameworkParser = require('../parsers/framework');
const linesParser = require('../parsers/lines');

const initialState = [];
const initialModuleState = {
  name: null,
  react: 0,
  angular: 0,
  native: 0
};

const findOrCreateModule = (modules, name) => {
  const module = modules.find(module => module.name === name);
  return module || {...initialModuleState, name};
};

const modules = (fileName, fileContent, previousState = initialState) => {
  const moduleName = moduleParser(fileName);
  const framework = frameworkParser(fileName, fileContent);
  const lines = linesParser(fileContent);

  const previousModule = findOrCreateModule(previousState, moduleName);
  const newModuleState = {
    ...previousModule,
    [framework]: previousModule[framework] + lines
  };

  if (previousState.find(module => module.name === moduleName)) {
    return previousState.map(
      moduleState =>
        moduleState.name === moduleName ? newModuleState : moduleState
    );
  }

  previousState.push(newModuleState);
  return previousState;
};

module.exports = modules;
