const resolveObjectOfPromises = objectOfPromises => {
  return Promise.all(
    Object.keys(objectOfPromises).map(promiseName => {
      return Promise.resolve(objectOfPromises[promiseName]).then(
        promiseResult => ({promiseName, promiseResult})
      );
    })
  ).then(items =>
    items.reduce((accumulator, item) => {
      accumulator[item.promiseName] = item.promiseResult;
      return accumulator;
    }, {})
  );
};

module.exports = {
  resolveObjectOfPromises
};
