const {find, read} = require('./files');

/**
 * Apply a reducer on files that match a pattern, in a path.
 */
const scan = (path, patterns, reducer) => {
  return new Promise((resolve, reject) => {
    let state = undefined;
    let done = 0;

    find(path, patterns)
      .then(files => {
        files.forEach(file => {
          read(file)
            .then(content => {
              state = reducer(file, content, state);
            })
            .catch(error => console.error(error))
            .finally(_ => ++done === files.length && resolve(state));
        });
      })
      .catch(error => console.log(error));
  });
};

module.exports = scan;
