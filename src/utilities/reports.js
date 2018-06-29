const {today} = require('./date');
const {read} = require('./files');

const updateHistory = (reports, previousHistory) => {
  const summary = reports.summarize || {};

  previousHistory.push({date: today(), ...summary});
  reports.history = previousHistory;

  return reports;
};

const addHistory = reports => {
  return read('reports.json')
    .then(content => {
      const history = JSON.parse(content).history || [];
      return updateHistory(reports, history);
    })
    .catch(() => updateHistory(reports, []));
};

module.exports = {
  addHistory
};
