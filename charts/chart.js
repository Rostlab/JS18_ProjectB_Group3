/**
 * Create an abstract class for different types of charts
 * Add setters and getters
 */
class Chart {
  constructor(data, layout) {
    this._layout = layout;
    this._data = data;
  }

  get layout() {
    return this._layout;
  }

  set layout(newLayout) {
    this._layout = newLayout;
  }

  get data() {
    return this._data;
  }

  set data(newData) {
    this._data = newData;
  }
}

module.exports = Chart;
