/*
* Mock data for bar chart
*
*/

const trace1 = {
  x: ['giraffes', 'orangutans', 'monkeys'],
  y: [20, 14, 23],
  name: 'SF Zoo',
  type: 'bar',
  width: 0.3,
};

const trace2 = {
  x: ['giraffes', 'orangutans', 'monkeys'],
  y: [12, 18, 29],
  name: 'LA Zoo',
  type: 'bar',
  width: 0.3,
};

const defaultData = [trace1, trace2];

const defaultLayout = {
  title: 'group',
};


/*
* Mock data for scatter plot
*
*/
const scatterTrace1 = {
  x: [2, 3, 4, 5],
  y: [16, 5, 11, 9],
  marker: {
    color: 'red',
    size: 4,
  },
  line: {
    color: 'red',
    width: 3,
  },
  name: 'Trace1',
};

const scatterTrace2 = {
  x: [1, 2, 3, 4],
  y: [12, 9, 15, 12],
  marker: {
    color: 'blue',
    size: 8,
  },
  line: {
    color: 'blue',
    width: 3,
  },
  name: 'Trace2',
};
const scatterData = [scatterTrace1, scatterTrace2];

const scatterLayout = {
  title: 'Scatter Plot',
};

module.exports = {
  defaultData,
  defaultLayout,
  scatterData,
  scatterLayout,
};
