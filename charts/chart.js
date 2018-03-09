/**
 * Create an abstract class for different types of charts
 */
class Chart {
  constructor(layoutOptions) {
    this.title = layoutOptions &&
                 layoutOptions.title &&
                 layoutOptions.title !== '' ? layoutOptions.title : 'Title';
    this.showlegend = layoutOptions.showlegend;
    this.legend = {
      x: layoutOptions &&
         layoutOptions.legend &&
         layoutOptions.legend.x ? layoutOptions.legend.x : 1,
      y: layoutOptions &&
         layoutOptions.legend &&
         layoutOptions.legend.y ? layoutOptions.legend.y : 1,
      font: {
        size: layoutOptions && layoutOptions.legend &&
              layoutOptions.legend.font &&
              layoutOptions.legend.font.size ? layoutOptions.legend.font.size : 12,
      },
    };
  }
}

module.exports = Chart;
