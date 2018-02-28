const Bar = require('../charts/bar');
const BarTrace = require('../data/barTrace');

module.exports = function (app) {
  app.get('/graph', (req, res) => {
    /**
     * Create data for Bar Chart
     */
    const x = [
      'giraffes',
      'orangutans',
      'monkeys',
    ];
    const y = [
      20,
      14,
      23,
    ];
    const x2 = [
      'lions',
      'tigers',
      'wolfes',
    ];
    const y2 = [
      6,
      3,
      10,
    ];
    const barTrace1 = new BarTrace(x, y, 'red', 'Trace 1');
    const barTrace2 = new BarTrace(x2, y2, 'blue', 'Trace 2');

    /**
     * Create layout for Bar Chart
     */
    const layout = {
      title: 'Test Bar Chart',
    };
    /**
     * Create a bar object as default value and return it in the response body
     * @type {Bar}
     */
    const bar = new Bar([barTrace1.getTraceData(), barTrace2.getTraceData()], layout);
    res.json(bar);
  });

  app.post('/graph', (req, res) => {
    // TODO A new subclass of Chart has to be created based on the user command
    res.json({ success: true });
  });

  app.get('*', (req, res) => {
    res.sendfile('./public/index.html');
  });
};
