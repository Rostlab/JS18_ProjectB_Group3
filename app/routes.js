const inputProcessing = require('./assets/scripts/inputProcessing');
const ChartFactory = require('./helpers/chartFactory');
const {
  defaultData: data, defaultLayout: layout,
  scatterData, scatterLayout,
} = require('../data/mockData');
const _ = require('lodash');


module.exports = function (app) {
  app.get('/graph', (req, res) => {
    // user ChartFactory to create a chart based on the selected example
    // load mock data (layout and data) based on the selected example
    const chart = {
      layout: undefined,
      data: undefined,
    };
    const selectedExample = _.lowerCase(req.query.example);
    switch (selectedExample) {
      case 'bar':
        chart.layout = layout;
        chart.data = data;
        break;
      case 'scatter':
        chart.layout = scatterLayout;
        chart.data = scatterData;
        break;
      case 'histogram':
        break;
      case 'pie':
        break;
      case 'line':
        break;
      default:
        chart.layout = layout;
        chart.data = data;
        break;
    }
    const chartFactory = new ChartFactory();
    const example = chartFactory.create(selectedExample, chart);
    res.json(example);
  });

  app.post('/graph', (req, res) => {
    console.log('PRINT REQ.BODY.INPUT: ', req.body.input);
    // use the existing chart object to redraw the chart
    const result = inputProcessing.process(req.body.input, req.body.chart);

    console.log('PRINT RESULT: ', result);

    res.json(result);


  });

  app.get('*', (req, res) => {
    res.sendfile('./public/index.html');
  });
};
