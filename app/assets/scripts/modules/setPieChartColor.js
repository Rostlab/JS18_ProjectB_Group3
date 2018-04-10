/*
* test module for changing the color of pie chart
*/
const ChartFactory = require('../../../helpers/chartFactory');

const setPieChartColor = (chart, params) => {
  try{
    if (chart.data[0].marker) {
      chart.data[0].marker['colors'] = params.newValue;
    } else {
      chart.data[0].marker = {
        colors: params.newValue
      };
    }
  } catch (error) {
    return error;
  }
  const chartFactory = new ChartFactory();
  const editPie = chartFactory.create(chart.data[0].type, chart);

  return editPie;
};

module.exports = setPieChartColor;
