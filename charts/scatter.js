const Chart = require('./chart');
const ScatterTrace = require('../data/scatterTrace');
const _ = require('lodash');

class Scatter extends Chart {
  constructor(layoutOptions, data) {
    super(layoutOptions);
    this.xaxis = {
      title: layoutOptions &&
             layoutOptions.xaxis &&
             layoutOptions.xaxis.title ? layoutOptions.xaxis.title : 'X Axis',
      showgrid: layoutOptions &&
                layoutOptions.xaxis &&
                layoutOptions.xaxis.showgrid ? layoutOptions.xaxis.showgrid : true,
      range: layoutOptions &&
             layoutOptions.xaxis && layoutOptions.xaxis.range ? layoutOptions.xaxis.range : '',
      gridcolor: layoutOptions &&
                 layoutOptions.xaxis &&
                 layoutOptions.xaxis.gridcolor ? layoutOptions.xaxis.gridcolor : '',
      gridwidth: layoutOptions &&
                 layoutOptions.xaxis &&
                 layoutOptions.xaxis.gridwidth ? layoutOptions.xaxis.gridwidth : '',
    };
    this.yaxis = {
      title: layoutOptions &&
             layoutOptions.yaxis &&
             layoutOptions.yaxis.title ? layoutOptions.yaxis.title : 'Y Axis',
      showgrid: layoutOptions &&
                layoutOptions.yaxis &&
                layoutOptions.yaxis.showgrid ? layoutOptions.yaxis.showgrid : true,
      range: layoutOptions &&
             layoutOptions.yaxis && layoutOptions.yaxis.range ? layoutOptions.yaxis.range : '',
      gridcolor: layoutOptions &&
                 layoutOptions.yaxis &&
                 layoutOptions.yaxis.gridcolor ? layoutOptions.yaxis.gridcolor : '',
      gridwidth: layoutOptions &&
                 layoutOptions.yaxis &&
                 layoutOptions.yaxis.gridwidth ? layoutOptions.yaxis.gridwidth : '',
    };
    // set data and layout for bar chart object
    this.data = data && data.length ? this.getData(data) : [];
    this.layout = this.getLayout();
  }


  /**
   * Create the data object for scatter chart
   * @param data
   * @returns {Array}
   */
  getData(data) {
    const resp = [];
    _.each(data, (d) => {
      const trace = new ScatterTrace(d);
      resp.push(trace.getTraceData());
    });

    return resp;
  }

  /**
   * Create layout object for scatter chart
   * @returns {{title: *, xaxis: ({title: string, showgrid: boolean}|*),
   * yaxis: ({title: string, showgrid: boolean}|*), showlegend: *, legend: *}}
   */
  getLayout() {
    return {
      title: this.title,
      xaxis: this.xaxis,
      yaxis: this.yaxis,
      showlegend: this.showlegend,
      legend: this.legend,
    };
  }
}

module.exports = Scatter;
