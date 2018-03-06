/*
* test module for changing the title
*/
const ChartFactory = require('../../../helpers/chartFactory');

class ChangeTitle {
  constructor(chart, params){
    this.chart = chart;
    this._newTitle = params.newTitle;
  }

  apply() {
    this.chart.layout['title'] = this._newTitle;
    const chartFactory = new ChartFactory();
    const editBar = chartFactory.create(this.chart.data[0].type, this.chart);
    return editBar;
  }
}

module.exports = ChangeTitle;
