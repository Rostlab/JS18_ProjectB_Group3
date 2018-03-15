/*
* test module for changing the color of pie chart
*/
const ChartFactory = require('../../../helpers/chartFactory');

const setPieChartColor = (chart, params) => {
  if (chart.data[0].marker) {
    chart.data[0].marker['colors'] = params.newValue;
  } else {
    chart.data[0].marker = {
      colors: params.newValue
    };
  }
  const chartFactory = new ChartFactory();
  const editPie = chartFactory.create(chart.data[0].type, chart);

  return editPie;
};

module.exports = setPieChartColor;
