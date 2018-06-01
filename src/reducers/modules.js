const moduleParser = require('../parsers/module');
const frameworkParser = require('../parsers/framework');
const linesParser = require('../parsers/lines');

const initialState = [];
const initialModuleState = {
  react: 0,
  angular: 0,
  native: 0,
};

const modules = (fileName, fileContent, previousState = initialState) => {
  const moduleName = moduleParser(fileName);
  const framework = frameworkParser(fileName, fileContent);
  const lines = linesParser(fileContent);
  const previousModuleState = previousState[ moduleName ] || initialModuleState;
  const newModuleState = {
    ...previousModuleState,
    [framework]: previousModuleState[framework] + lines
  };
  return {
    ...previousState,
    [moduleName]: newModuleState
  };
};

module.exports = modules;
