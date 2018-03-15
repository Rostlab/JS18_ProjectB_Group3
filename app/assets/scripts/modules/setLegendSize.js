const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setLegendSize = (chart, params) => {
  chart.layout.legend.font.size = params.newValue;
  const chartFactory = new ChartFactory();

  return chartFactory.create(chart.data[0].type, chart);
}

module.exports = setLegendSize;

