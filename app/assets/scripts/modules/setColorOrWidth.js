/*
* test module for changing the title
*/
const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setColorOrWidth = (chart, params) => {
  _.each(chart.data, (d) => {
    if (d.name === params.name) {
      if (params.attribute === 'dot') {
        if (params.option === 'color') {
          d.marker.color = params.newValue
        } else {
          d.marker.size = params.newValue
        }
      } else {
        if (params.option === 'color') {
          d.line.color = params.newValue
        } else {
          d.line.width = params.newValue
        }
      }
    }
  });
  // get type from the first data element
  // create the chart based on this type and the current chart properties (layout and data)
  const chartFactory = new ChartFactory();
  const editScatter = chartFactory.create(chart.data[0].type, chart);

  return editScatter;
};

module.exports = setColorOrWidth;
