/*
* test module for changing the width of bars
*/
const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const changeBarColor = (chart, params) => {
  try{
    _.each(chart.data, (d) => {
      d.color = params.newBarColor;
    });
  } catch (error) {
    return error;
  }

  const chartFactory = new ChartFactory();
  const editBar = chartFactory.create(chart.data[0].type, chart);
  
  return editBar;
};



module.exports = changeBarColor;

