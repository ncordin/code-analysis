const countTests = (fileName, fileContent) => {
  if (fileName.match(/spec|test/g)) {
    return (fileContent.match(/it\(/g) || []).length;
  }
  return 0;
}

module.exports = countTests;
