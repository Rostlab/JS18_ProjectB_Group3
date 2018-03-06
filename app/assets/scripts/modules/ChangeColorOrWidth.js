/*
* test module for changing the title
*/
const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

class ChangeColorOrWidth {
  constructor(chart, params){
    this.chart = chart;
    this.name = params.name;
    this.attribute = params.attribute;
    this.option = params.option;
    this.newValue = params.newValue;
  }

  apply() {
    _.each(this.chart.data, (d) => {
      if (d.name === this.name) {
        if (this.attribute === 'dot') {
          if (this.option === 'color') {
            d.marker.color = this.newValue
          } else {
            d.marker.size = this.newValue
          }
        } else {
          if (this.option === 'color') {
            d.line.color = this.newValue
          } else {
            d.line.width = this.newValue
          }
        }
      }
    });
    // get type from the first data element
    // create the chart based on this type and the current chart properties (layout and data)
    const chartFactory = new ChartFactory();
    const editScatter = chartFactory.create(this.chart.data[0].type, this.chart);
    return editScatter;
  }
}

module.exports = ChangeColorOrWidth;
