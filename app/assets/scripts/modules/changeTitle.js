/*
* test module for changing the title
*/

const Bar = require('../../../../charts/bar');
const BarTrace = require('../../../../data/barTrace');

class ChangeTitle {
  constructor(graphObject, params){
    this._graphObject = graphObject;
    this._newTitle = params.newTitle;
  }

  apply() {
  	var newLayout = {
      //title: req.body.input
      title: this._newTitle
    }
    var editBar = new Bar(this._graphObject, newLayout);

    return editBar;
  }
}

module.exports = ChangeTitle;
