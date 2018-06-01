const countComponents = (framework, fileContent) => {
  if (framework === 'react') {
    return fileContent.includes('import React') ? 1 : 0;
  }
  if (framework === 'angular') {
    const directives = fileContent.match(/.directive\(/g) || [];
    const components = fileContent.match(/.component\(/g) || [];
    return directives.concat(components).length;
  }
  return 0;
}

module.exports = countComponents;
