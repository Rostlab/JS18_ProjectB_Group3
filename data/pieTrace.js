class PieTrace {
  constructor(options) {
    this.type = 'pie';
    this.values = options.values;
    this.labels = options.labels;
    this.hoverinfo = options.hoverinfo ? options.hoverinfo : 'percent';
    this.textinfo = options.textinfo ? options.textinfo : 'percent';
    this.name = options.name;
    this.marker = {
      colors: options.marker && options.marker.colors ? options.marker.colors : '',
    };
  }

  /**
   * Calculate correct data format for Pie Chart
   * @returns {{type: string, values: *, labels: *, hoverinfo: *, textinfo: *,
   * marker: ({colors: undefined}|*), name: *}}
   */
  getTraceData() {
    return {
      type: this.type,
      values: this.values,
      labels: this.labels,
      hoverinfo: this.hoverinfo,
      textinfo: this.textinfo,
      marker: this.marker,
      name: this.name,
    };
  }
}

module.exports = PieTrace;
