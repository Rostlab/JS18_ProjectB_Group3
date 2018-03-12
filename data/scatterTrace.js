class ScatterTrace {
  constructor(options) {
    this.type = 'scatter';
    this.mode = options.mode;
    this.x = options.x;
    this.y = options.y;
    this.marker = {
      opacity: options.marker && options.marker.opacity ? options.marker.opacity : undefined,
      symbol: options.marker && options.marker.symbol ? options.marker.symbol : undefined,
      color: options.marker && options.marker.color ? options.marker.color : undefined,
      size: options.marker && options.marker.size ? options.marker.size : undefined,
    };
    this.name = options.name;
    this.line = {
      dash: options.line && options.line.dash ? options.line.dash : undefined,
      color: options.line && options.line.color ? options.line.color : undefined,
      width: options.line && options.line.width ? options.line.width : undefined,
    };
  }

  /**
   * Calculate correct data format for Scatter Chart
   * @returns {{type: string, mode: string, x: (Number|*|Array|number),
   * y: (Number|*|Array|number), name: *, marker: ({color: *, size: *}|*),
   * line: ({color: undefined, width: undefined}|*)}}
   */
  getTraceData() {
    return {
      type: this.type,
      mode: this.mode,
      x: this.x,
      y: this.y,
      name: this.name,
      marker: this.marker,
      line: this.line,
    };
  }
}

module.exports = ScatterTrace;
