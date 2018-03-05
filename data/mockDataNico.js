const trace1 = {
  x: ['giraffes', 'orangutans', 'monkeys'],
  y: [20, 14, 23],
  name: 'SF Zoo',
  type: 'bar',
};

const trace2 = {
  x: ['giraffes', 'orangutans', 'monkeys'],
  y: [12, 18, 29],
  name: 'LA Zoo',
  type: 'bar',
};

const data = [trace1, trace2];

const layout = {
  title: 'group',
};

module.exports = {
  data,
  layout,
};
