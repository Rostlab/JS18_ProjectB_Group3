/*
* test module for changing the axis range
*/
const ChartFactory = require('../../../helpers/chartFactory');

const setAxisRange = (chart, params) => {
  try{
    if(params.axis === 'x'){
      chart.layout['xaxis'].range = params.newValue;
    } else {
      chart.layout['yaxis'].range = params.newValue;
    }
  } catch (error) {
    return error;
  }
  const chartFactory = new ChartFactory();
  const editHistogram = chartFactory.create(chart.data[0].type, chart);

  return editHistogram;
};

module.exports = setAxisRange;
