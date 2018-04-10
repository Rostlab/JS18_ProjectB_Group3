/*
* test module for changing the title
*/
const ChartFactory = require('../../../helpers/chartFactory');

const setTitle = (chart, params) => {
  try{
    chart.layout['title'] = params.newTitle;
  } catch (error) {
    return error;
  }
  const chartFactory = new ChartFactory();
  const editBar = chartFactory.create(chart.data[0].type, chart);

  return editBar;
};

module.exports = setTitle;