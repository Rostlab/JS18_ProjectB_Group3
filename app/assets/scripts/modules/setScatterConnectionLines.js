/*
* test module for changing the connection lines
*/
const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setScatterConnectionLines = (chart, params) => {
  try{
    _.each(chart.data, (d) => {
      if (d.name === params.name) {
        d.mode = params.newValue;
      }
    });
  } catch (error) {
    return error;
  }
  // get type from the first data element
  // create the chart based on this type and the current chart properties (layout and data)
  const chartFactory = new ChartFactory();
  const editScatter = chartFactory.create(chart.data[0].type, chart);

  return editScatter;
};

module.exports = setScatterConnectionLines;
