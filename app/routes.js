const Bar = require('../charts/bar');

module.exports = function (app) {
  app.get('/graph', (req, res) => {
    /**
     * Create data for Bar Chart
     */
    const trace1 = {
      x: [
        'giraffes',
        'orangutans',
        'monkeys',
      ],
      y: [
        20,
        14,
        23,
      ],
      color: 'red',
      name: 'Trace 1',
    };

    const trace2 = {
      x: [
        'lions',
        'tigers',
        'wolfes',
      ],
      y: [
        6,
        3,
        10,
      ],
      color: 'blue',
      name: 'Trace 2',
    };

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
    const bar = new Bar(layout, [trace1, trace2]);
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
