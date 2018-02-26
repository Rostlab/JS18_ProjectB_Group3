module.exports = function (app) {
  app.get('/graph', (req, res) => {
    res.json({ success: true });
  });

  app.post('/graph', (req, res) => {
    res.json({ success: true });
  });

  app.get('*', (req, res) => {
    res.sendfile('./public/index.html');
  });
};
