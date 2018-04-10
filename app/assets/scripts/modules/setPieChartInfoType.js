/*
* test module for changing the info type of pie chart
*/
const ChartFactory = require('../../../helpers/chartFactory');

const setPieChartColor = (chart, params) => {
  try{
    chart.data[0]['hoverinfo'] = params.newValue;
    chart.data[0]['textinfo'] = params.newValue;
  } catch (error) {
    return error;
  }
  const chartFactory = new ChartFactory();
  const editPie = chartFactory.create(chart.data[0].type, chart);

  return editPie;
};

module.exports = setPieChartColor;
