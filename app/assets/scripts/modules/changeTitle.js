/*
* test module for changing the title
*/

const Bar = require('../../../../charts/bar');
const BarTrace = require('../../../../data/barTrace');

class ChangeTitle {
  constructor(data, params){
    this._data = data;
    this._newTitle = params.newTitle;
  }

  apply() {
  	var newLayout = {
      //title: req.body.input
      title: this._newTitle
    }
    var editBar = new Bar(newLayout, this._data);
    console.log(editBar, 'ASDASDA');
    return editBar;
  }
}

module.exports = ChangeTitle;
