class HistogramTrace {
  constructor(options) {
    this.type = 'histogram';
    this.x = options.x;
    this.y = options.y;
    this.marker = {
      color: options.marker && options.marker.color ? options.marker.color : undefined,
    };
    this.name = options.name;
    this.autobinx = Object.prototype.hasOwnProperty.call(options, 'autobinx') ? options.autobinx : true;
    this.autobiny = Object.prototype.hasOwnProperty.call(options, 'autobiny') ? options.autobiny : true;
    this.xbins = {
      start: options.xbins && options.xbins.start ? options.xbins.start : undefined,
      end: options.xbins && options.xbins.end ? options.xbins.end : undefined,
      size: options.xbins && options.xbins.size ? options.xbins.size : undefined,
    };
    this.ybins = {
      start: options.ybins && options.ybins.start ? options.ybins.start : undefined,
      end: options.ybins && options.ybins.end ? options.ybins.end : undefined,
      size: options.ybins && options.ybins.size ? options.ybins.size : undefined,
    };
  }

  /**
   * Calculate correct data format for Bar Chart
   * @returns {{type: string, x: *, y: *, name: *, marker: ({color: *}|*)}}
   */
  getTraceData() {
    return {
      type: this.type,
      x: this.x,
      y: this.y,
      name: this.name,
      marker: this.marker,
      autobinx: this.autobinx,
      xbins: this.xbins,
      ybins: this.ybins,
    };
  }
}

module.exports = HistogramTrace;
