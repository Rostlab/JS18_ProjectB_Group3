/*
* test module for changing the axis range
*/
const ChartFactory = require('../../../helpers/chartFactory');

const setAxisRange = (chart, params) => {
  if(params.axis === 'x'){
    chart.layout['xaxis'].range = params.newValue;
  } else {
    chart.layout['yaxis'].range = params.newValue;
  }
  const chartFactory = new ChartFactory();
  const editHistogram = chartFactory.create(chart.data[0].type, chart);

  return editHistogram;
};

module.exports = setAxisRange;
