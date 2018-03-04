
const inputProcessing = require('./assets/scripts/inputProcessing');
const Bar = require('../charts/bar');
const BarTrace = require('../data/barTrace');

var data = require('../data/mockDataNico').data;
var layout = require('../data/mockDataNico').layout;
var bar = new Bar(data, layout);

module.exports = function(app) {
  app.get('/graph', (req, res) => {
    //returns the bar graph object

    res.json(bar);
  });

  app.post('/graph', (req, res) => {
    // TODO A new subclass of Chart has to be created based on the user command
    //console.log(req.body.input);
    //console.log(bar.layout.title);

    var result = inputProcessing.process(req.body.input, data);


    res.json(result);
  });

  app.get('*', (req, res) => {
    res.sendfile('./public/index.html');
  });
};
