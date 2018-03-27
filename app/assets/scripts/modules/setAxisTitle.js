/*
* test module for changing the axis titles
*/
const ChartFactory = require('../../../helpers/chartFactory');

const setAxisTitle = (chart, params) => {
  try{
    if(params.axis === 'x'){
      chart.layout['xaxis'].title = params.newTitle;
    } else {
      chart.layout['yaxis'].title = params.newTitle;
    }
  } catch (error) {
    return error;
  }
  const chartFactory = new ChartFactory();
  const editBar = chartFactory.create(chart.data[0].type, chart);

  return editBar;
};

module.exports = setAxisTitle;
