const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setLegendSize = (chart, params) => {
  try{
    chart.layout.legend.font.size = params.newValue;
  } catch (error) {
    return error;
  }
  const chartFactory = new ChartFactory();

  return chartFactory.create(chart.data[0].type, chart);
}

module.exports = setLegendSize;

