/*
* test module for changing the line dash
*/
const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setScatterLineDash = (chart, params) => {
  try{
    _.each(chart.data, (d) => {
      if (d.name === params.name) {
        d.line.dash = params.newValue;
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

module.exports = setScatterLineDash;
