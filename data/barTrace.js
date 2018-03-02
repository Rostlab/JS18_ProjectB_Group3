class BarTrace {
  constructor(x, y, color, name) {
    this.type = 'bar';
    this.x = x;
    this.y = y;
    this.marker = {
      color,
    };
    this.name = name;
    this.width = undefined;
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
    };
  }
}

module.exports = BarTrace;
