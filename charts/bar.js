const Chart = require('./chart');
const _ = require('lodash');

class Bar extends Chart {
  constructor(data, layout) {
    super();
    this._data = _.isEmpty(data) ? [] : data;
    this._layout = {
      title: layout.title ? layout.title : 'Title',
      xaxis: {
        title: layout.xaxis && layout.xaxis.title ? layout.xaxis.title : 'X Axis',
        showgrid: layout.xaxis && layout.xaxis.showgrid ? layout.xaxis.showgrid : true,
      },
      yaxis: {
        title: layout.yaxis && layout.yaxis.title ? layout.yaxis.title : 'Y Axis',
        showgrid: layout.yaxis && layout.yaxis.showgrid ? layout.yaxis.showgrid : true,
      },
      showlegend: layout.showlegend ? layout.showlegend : true,
      legend: {
        x: layout.legend && layout.legend.x ? layout.legend.x : 1,
        y: layout.legend && layout.legend.y ? layout.legend.y : 1,
        font: {
          size: layout.legend &&
                layout.legend.font &&
                layout.legend.font.size ? layout.legend.font.size : 12,
        },
      },
    };
  }

  /**
   * Get title of Bar Chart
   * @returns {string|*}
   */
  get title() {
    return this._layout.title;
  }

  /**
   * Set title of Bar Chart
   * @param newTitle
   */
  set title(newTitle) {
    this._layout.title = newTitle;
  }

  /**
   * Get x axis of Bar Chart
   * @returns {Bar._layout.xaxis|{title, showgrid}}
   */
  get xaxis() {
    return this._layout.xaxis;
  }

  /**
   * Set x axis of Bar Chart
   * newXAxis can have title and showgrid fields
   * @param newXAxis
   */
  set xaxis(newXAxis) {
    if (_.isEmpty(newXAxis)) {
      throw new Error('Invalid xaxis');
    }
    if (newXAxis.title) {
      this._layout.xaxis.title = newXAxis.title;
    }
    if (newXAxis.showgrid) {
      this._layout.xaxis.showgrid = newXAxis.showgrid;
    }
  }

  /**
   * Get y axis of Bar Chart
   * @returns {Bar._layout.yaxis|{title, showgrid}}
   */
  get yaxis() {
    return this._layout.yaxis;
  }

  /**
   * Set y axis of Bar Chart
   * newYAxis can have title and showgrid fields
   * @param newYAxis
   */
  set yaxis(newYAxis) {
    if (_.isEmpty(newYAxis)) {
      throw new Error('Invalid yaxis');
    }
    if (newYAxis.title) {
      this._layout.yaxis.title = newYAxis.title;
    }
    if (newYAxis.showgrid) {
      this._layout.yaxis.showgrid = newYAxis.showgrid;
    }
  }

  /**
   * Get value of legend visibility of Bar Chart
   * @returns {boolean|*}
   */
  get showlegend() {
    return this._layout.showlegend;
  }

  /**
   * Set value of legend visibility of Bar Chart
   * @param isLegendVisible
   */
  set showlegend(isLegendVisible) {
    this._layout.showlegend = isLegendVisible;
  }

  /**
   * Get legend position of Bar Chart
   * @returns {{x: (number|*), y: (number|*)}}
   */
  get legendPosition() {
    return {
      x: this._layout.legend.x,
      y: this._layout.legend.y,
    };
  }

  /**
   * Set legend position of Bar Chart
   * @param position
   */
  set legendPosition(position) {
    if (!position.x || !position.y) {
      throw new Error('Missing x or y coordinates');
    }
    this._layout.legend.x = position.x;
    this._layout.legend.y = position.y;
  }

  /**
   * Get legend size of Bar Chart
   * @returns {number|*}
   */
  get legendSize() {
    return this._layout.legend.font.size;
  }

  /**
   * Set legend size of Bar Chart
   * @param newSize
   */
  set legendSize(newSize) {
    if (newSize <= 0) {
      throw new Error('Invalid size');
    }
    this._layout.legend.font.size = newSize;
  }

  /**
   * Get layout of chart
   * @returns {{title: string, xaxis: {title: string, showgrid: boolean},
   * yaxis: {title: string, showgrid: boolean},
   * showlegend: boolean, legend: {x: number, y: number, font: {size: number}}}|*}
   */
  get layout() {
    return this._layout;
  }

  /**
   * Get data of chart
   * @returns {Array|*}
   */
  get data() {
    return this._data;
  }
}

module.exports = Bar;
