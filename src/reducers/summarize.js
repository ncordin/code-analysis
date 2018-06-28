const frameworkParser = require('../parsers/framework');
const linesParser = require('../parsers/lines');
const testParser = require('../parsers/tests');
const componentsParser = require('../parsers/components');

const initialFrameworkState = {
  lines: 0,
  files: 0,
  components: 0,
  tests: 0,
};

const initialState = {
  angular: {...initialFrameworkState},
  react: {...initialFrameworkState},
  native: {...initialFrameworkState},
};

const summarize = (fileName, fileContent, previousState = initialState) => {
  const framework = frameworkParser(fileName, fileContent);
  const frameworkState = {...previousState[framework]};
  frameworkState.files += 1;
  frameworkState.lines += linesParser(fileContent);
  frameworkState.tests += testParser(fileName, fileContent);
  frameworkState.components += componentsParser(framework, fileContent);
  return {
    ...previousState,
    [framework]: frameworkState
  };
};

module.exports = summarize;
