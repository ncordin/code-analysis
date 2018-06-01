const getModuleName = fileName => {
  if (fileName.match(/\/modules\/(.*)\//)) {
    const [, moduleAndFileName] = fileName.split('/modules/');
    const [moduleName] = moduleAndFileName.split('/');
    return moduleName;
  }
  if (fileName.match(/\/business\/(.*)\//)) {
    const [, moduleAndFileName] = fileName.split('/business/');
    const [moduleName] = moduleAndFileName.split('/');
    return moduleName;
  }
  if (fileName.match(/\/components\/(.*)\//)) {
    const [, moduleAndFileName] = fileName.split('/components/');
    const [moduleName] = moduleAndFileName.split('/');
    return moduleName;
  }
  if (fileName.match(/\/bundles\/(.*)\//)) {
    const [, moduleAndFileName] = fileName.split('/bundles/');
    const [moduleName] = moduleAndFileName.split('/');
    return moduleName;
  }
  return null;
};

module.exports = getModuleName;
