class BarTrace {
  constructor(x, y, color, name) {
    this._type = 'bar';
    this._x = x;
    this._y = y;
    this._marker = {
      color,
    };
    this._name = name;
    this._width = undefined;
  }

  /**
   * Get x values of X axis
   * @returns {*}
   */
  get x() {
    return this._x;
  }

  /**
   * Set x values of X axis
   * @param newX
   */
  set x(newX) {
    this._x = newX;
  }

  /**
   * Get y values of Y axis
   * @returns {*}
   */
  get y() {
    return this._y;
  }

  /**
   * Set y values of Y axis
   * @param newY
   */
  set y(newY) {
    this._y = newY;
  }

  /**
   * Get name of trace
   * @returns {*}
   */
  get name() {
    return this._name;
  }

  /**
   * Set name of trace
   * @param newName
   */
  set name(newName) {
    this._name = newName;
  }

  /**
   * Get width of each x value
   * @returns {*}
   */
  get width() {
    return this._width;
  }

  /**
   * Set width of each x value
   * @param newWidth
   */
  set width(newWidth) {
    this._width = newWidth;
  }

  /**
   * Get color of trace
   * @returns {*}
   */
  get color() {
    return this._marker.color;
  }

  /**
   * Set color of trace
   * @param newColor
   */
  set color(newColor) {
    this._marker.color = newColor;
  }

  /**
   * Calculate correct data format for Bar Chart
   * @returns {{type: string, x: *, y: *, name: *, marker: ({color: *}|*)}}
   */
  getTraceData() {
    return {
      type: this._type,
      x: this._x,
      y: this._y,
      name: this._name,
      marker: this._marker,
    };
  }
}

module.exports = BarTrace;
