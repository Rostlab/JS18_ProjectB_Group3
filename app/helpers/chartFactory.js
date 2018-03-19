const Charts = require('../../charts');
const Bar = Charts.Bar;
const Scatter = Charts.Scatter;
const Histogram = Charts.Histogram;
const Pie = Charts.Pie;

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
        return new Histogram(chartProperties.layout, chartProperties.data);
        break;
      case 'pie':
        return new Pie(chartProperties.layout, chartProperties.data);
        break;
      default:
        return new Bar(chartProperties.layout, chartProperties.data);
        break;
    }
  }
}

module.exports = ChartFactory;