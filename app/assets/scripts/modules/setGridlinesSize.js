const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setGridlinesSize = (chart, params) => {
  try{
    if (params.axis === 'x') {
      chart.layout.xaxis.gridwidth = params.newValue;
    } else {
      chart.layout.yaxis.gridwidth = params.newValue;
    }
  } catch (error) {
    return error;
  }
  // get type from the first data element
  // create the chart based on this type and the current chart properties (layout and data)
  const chartFactory = new ChartFactory();
  const editChart = chartFactory.create(chart.data[0].type, chart);

  return editChart;
};

module.exports = setGridlinesSize;
