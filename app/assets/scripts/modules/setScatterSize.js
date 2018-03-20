/*
* test module for changing the color or the width of scatter plot
*/
const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setScatterSize = (chart, params) => {
  _.each(chart.data, (d) => {
    if (d.name === params.name) {
      if (params.attribute === 'dot') {
        d.marker.size = params.newValue;
      } else {
        d.line.width = params.newValue;
      }
    }
  });
  // get type from the first data element
  // create the chart based on this type and the current chart properties (layout and data)
  const chartFactory = new ChartFactory();
  const editScatter = chartFactory.create(chart.data[0].type, chart);

  return editScatter;
};

module.exports = setScatterSize;
