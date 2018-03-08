/*
* test module for changing the title
*/
const ChartFactory = require('../../../helpers/chartFactory');

const setTitle = (chart, params) => {
  chart.layout['title'] = params.newTitle;
  const chartFactory = new ChartFactory();
  const editBar = chartFactory.create(chart.data[0].type, chart);

  return editBar;
};

module.exports = setTitle;