
const inputProcessing = require('./assets/scripts/inputProcessing');
const Bar = require('../charts/bar');
// const BarTrace = require('../data/barTrace');

const {data: data} = require('../data/mockDataNico');
const {layout: layout} = require('../data/mockDataNico');

const bar = new Bar(layout, data);

module.exports = function (app) {
  app.get('/graph', (req, res) => {
    // returns the bar graph object

    res.json(bar);
  });

  app.post('/graph', (req, res) => {
    // TODO A new subclass of Chart has to be created based on the user command
    // console.log(req.body.input);
    // console.log(bar.layout.title);
    console.log('PRINT REQ.BODY.INPUT: ', req.body.input);
    const result = inputProcessing.process(req.body.input, data);

    console.log('PRINT RESULT: ', result);
    res.json(result);
  });

  app.get('*', (req, res) => {
    res.sendfile('./public/index.html');
  });
};
