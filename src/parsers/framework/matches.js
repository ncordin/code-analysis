const matches = {
  react: {
    fileName: [
      '/actions/',
      '/reducers/',
      '/modules/migration/',
      '/store/',
      '.spec.js'
    ],
    fileContent: [
      '/migration/',
      'redux',
      'React'
    ]
  },
  angular: {
    fileName: [
      '-model.',
      '-directive',
      '.html',
      '_test'
    ],
    fileContent: [
      'angular',
      'template',
      'controller',
      '$get',
      'ngInject',
      'scope',
      'injector',
      'MockFactory'
    ]
  }
};

module.exports = matches;
