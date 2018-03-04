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
         layoutOptions.legendPosition &&
         layoutOptions.legendPosition.x ? layoutOptions.legendPosition.x : 1,
      y: layoutOptions &&
         layoutOptions.legendPosition &&
         layoutOptions.legendPosition.y ? layoutOptions.legendPosition.y : 1,
      font: {
        size: layoutOptions && layoutOptions.legendFont ? layoutOptions.legendFont : 12,
      },
    };
  }
}

module.exports = Chart;
