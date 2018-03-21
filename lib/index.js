const inputProcessing = require('../app/assets/scripts/inputProcessing');
const ChartFactory = require('../app/helpers/chartFactory');
const _ = require('lodash');

exports.editChart = function (inputString, plotlyObject, callback) {
  if (!_.isString(inputString) || inputString === '') {
    const invalidCommand = new Error('Invalid command');
    callback(invalidCommand, null);
    return;
  }
  if (!Object.prototype.hasOwnProperty.call(plotlyObject, 'data') ||
      !Object.prototype.hasOwnProperty.call(plotlyObject, 'layout')) {
    const missingChartProperty = new Error('Data or layout missing');
    callback(missingChartProperty, null);
    return;
  }
  if (_.isEmpty(plotlyObject.data)) {
    const invalidDataProperty = new Error('Data array cant be empty');
    callback(invalidDataProperty, null);
    return;
  }
  if (_.isEmpty(plotlyObject.layout)) {
    const invalidLayoutProperty = new Error('Layout cant be empty');
    callback(invalidLayoutProperty, null);
    return;
  }
  const chartFactory = new ChartFactory();
  const chart = chartFactory.create(plotlyObject.data[0].type, plotlyObject);
  inputProcessing.process(inputString, chart, (error, result) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result);
  });
};
