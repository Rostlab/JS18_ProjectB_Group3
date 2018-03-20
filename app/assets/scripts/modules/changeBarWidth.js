/*
* test module for changing the width of bars
*/
const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setBarWidth = (chart, params) => {
  _.each(chart.data, (d) => {
    d.width = params.newBarWidth;
  });

  const chartFactory = new ChartFactory();
  const editBar = chartFactory.create(chart.data[0].type, chart);
  
  return editBar;
};



module.exports = setBarWidth;

