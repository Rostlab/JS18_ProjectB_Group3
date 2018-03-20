const inputProcessing = require('./assets/scripts/inputProcessing');
const ChartFactory = require('./helpers/chartFactory');
const {
  defaultData: data, defaultLayout: layout,
  scatterData, scatterLayout,
  histogramData, histogramLayout,
  pieData, pieLayout,
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
        chart.layout = histogramLayout;
        chart.data = histogramData;
        break;
      case 'pie':
        chart.layout = pieLayout;
        chart.data = pieData;
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
    // use the existing chart object to redraw the chart
    inputProcessing.process(req.body.input, req.body.chart, (error, result) => {
      if (error) {
        res.status(400).send(error.message);
        return;
      }
      res.json(result);
    });
  });

  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: '../public' });
  });
};
