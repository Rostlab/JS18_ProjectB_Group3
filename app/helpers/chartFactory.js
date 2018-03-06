const Bar = require('../../charts/bar');
const Scatter = require('../../charts/scatter');

class ChartFactory {

  /**
   * Based on the given type and the chart properties, it handles creation of chart objects
   * @param type
   * @param chartProperties
   * @returns {*}
   */
  create(type, chartProperties) {
    switch(type) {
      case 'bar':
        return new Bar(chartProperties.layout, chartProperties.data);
        break;
      case 'scatter':
        return new Scatter(chartProperties.layout, chartProperties.data);
        break;
      case 'histogram':
        break;
      case 'pie':
        break;
      case 'line':
        break;
      default:
        return new Bar(chartProperties.layout, chartProperties.data);
        break;
    }
  }
}

module.exports = ChartFactory;