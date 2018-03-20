const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setGridlinesColor = (chart, params) => {
  if (params.axis === 'x') {
    chart.layout.xaxis.gridcolor = params.newValue;
  } else {
    chart.layout.yaxis.gridcolor = params.newValue;
  }
  // get type from the first data element
  // create the chart based on this type and the current chart properties (layout and data)
  const chartFactory = new ChartFactory();
  const editChart = chartFactory.create(chart.data[0].type, chart);

  return editChart;
};

module.exports = setGridlinesColor;
