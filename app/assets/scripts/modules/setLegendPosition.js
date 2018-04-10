const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setLegendPosition = (chart, params) => {
  try{
    if (chart.layout.legend) {
      chart.layout.legend.x = params.newXValue;
      chart.layout.legend.y = params.newYValue;
    } else {
      chart.layout.legend = {
        x: params.newXValue,
        y: params.newYValue,
      };
    }
  } catch (error) {
    return error;
  }
  const chartFactory = new ChartFactory();

  return chartFactory.create(chart.data[0].type, chart);
};

module.exports = setLegendPosition;
