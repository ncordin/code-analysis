const {today} = require('./date');
const {read} = require('./files');

const updateHistory = reports => {
  const history = reports.find(report => report.name === 'history') || [];
  const summary = reports.find(report => report.name === 'summarize').content;

  history.push({date: today(), ...summary});
  reports.push({name: 'history', content: history});

  return reports;
};

const addHistory = reports => {
  return read('reports.json')
    .then(content => updateHistory(content))
    .catch(() => updateHistory(reports));
};

module.exports = {
  addHistory
};
