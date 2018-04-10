/*
* test module for changing the bin number
*/
const ChartFactory = require('../../../helpers/chartFactory');
const _ = require('lodash');

const setAxisRange = (chart, params) => {
  try{
    _.each(chart.data, (d) => {
      if (d.name === params.name) {
        if(params.axis === 'x'){
          d.xbins = {
            start: params.newStart,
            end: params.newEnd,
            size: params.newSize
          };
          d.autobinx = false;
        } else {
          d.ybins = {
            start: params.newStart,
            end: params.newEnd,
            size: params.newSize
          };
          d.autobiny = false;
        }
      }
    });
  } catch (error) {
    return error;
  }
  const chartFactory = new ChartFactory();
  const editHistogram = chartFactory.create(chart.data[0].type, chart);

  return editHistogram;
};

module.exports = setAxisRange;
