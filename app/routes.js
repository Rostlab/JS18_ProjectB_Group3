const Bar = require('../charts/bar');

module.exports = function (app) {
  app.get('/graph', (req, res) => {
    /**
     * Create a bar object as default value and return it in the response body
     * @type {Bar}
     */
    const bar = new Bar();
    const newBarData = [
      {
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
        type: 'bar',
      },
    ];
    bar.data = newBarData;
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
