const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setLegendPosition = (chart, params) => {
  chart.layout.legend.x = params.newXValue;
  chart.layout.legend.y = params.newYValue;
  const chartFactory = new ChartFactory();

  return chartFactory.create(chart.data[0].type, chart);
};

module.exports = setLegendPosition;
