const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setColorOrWidth = (chart, params) => {
  if (params.axis === 'x') {
    if (params.option === 'color') {
      chart.layout.xaxis.gridcolor = params.newValue;
    } else {
      chart.layout.xaxis.gridwidth = params.newValue;
    }
  } else {
    if (params.option === 'color') {
      chart.layout.yaxis.gridcolor = params.newValue;
    } else {
      chart.layout.yaxis.gridwidth = params.newValue;
    }
  }
  // get type from the first data element
  // create the chart based on this type and the current chart properties (layout and data)
  const chartFactory = new ChartFactory();
  const editScatter = chartFactory.create(chart.data[0].type, chart);

  return editScatter;
};

module.exports = setColorOrWidth;
