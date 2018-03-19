class BarTrace {
  constructor(x, y, color, name, width) {
    this.type = 'bar';
    this.x = x;
    this.y = y;
    this.marker = {
      color,
    };
    this.name = name;
    this.width = width;
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
      width: this.width,
    };
  }
}

module.exports = BarTrace;
