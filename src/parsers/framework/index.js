const matches = require('./matches');

const contains = (string, values) =>
  values.some(value => string.includes(value));

const matchFileOrContent = (nameMatches, contentMatches) => (name, content) => {
  return contains(name, nameMatches) || contains(content, contentMatches);
};

const isReact = matchFileOrContent(
  matches.react.fileName,
  matches.react.fileContent
);

const isAngular = matchFileOrContent(
  matches.angular.fileName,
  matches.angular.fileContent
);

const getFramework = (fileName, fileContent) =>
  isAngular(fileName, fileContent)
    ? 'angular'
    : isReact(fileName, fileContent)
      ? 'react'
      : 'native';

module.exports = getFramework;
