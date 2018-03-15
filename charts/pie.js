const PieTrace = require('../data/pieTrace');
const _ = require('lodash');

class Pie {
  constructor(layoutOptions, data) {
    // set data and layout for bar chart object
    this.data = data && data.length ? this.getData(data) : [];
    this.layout = layoutOptions;
  }

  /**
   * Create the data object for pie chart
   * @param data
   * @returns {Array}
   */
  getData(data) {
    const resp = [];
    _.each(data, (d) => {
      const trace = new PieTrace(d);
      resp.push(trace.getTraceData());
    });

    return resp;
  }
}

module.exports = Pie;
