/*
* Mock data for charts
*
*/

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
    opacity: 0.2,
    symbol: 'star',
    color: 'red',
    size: 8,
  },
  line: {
    color: 'red',
    width: 3,
  },
  name: 'Trace1',
  mode: 'lines+markers',
};

const scatterTrace2 = {
  x: [1, 2, 3, 4],
  y: [12, 9, 15, 12],
  line: {
    dash: 'dash',
    color: 'blue',
    width: 3,
  },
  name: 'Trace2',
  mode: 'lines',
};
const scatterData = [scatterTrace1, scatterTrace2];

const scatterLayout = {
  title: 'Scatter Plot',
};

/*
* Mock data for histogram plot
*
*/
const x1 = [];
const x2 = [];
const y1 = [];
const y2 = [];
for (let i = 1; i < 500; i += 1) {
  const k = Math.random();
  x1.push(k * 5);
  x2.push(k * 10);
  y1.push(k);
  y2.push(k * 2);
}

const histogramTrace1 = {
  x: x1,
  y: y1,
  name: 'Trace1',
};

const histogramTrace2 = {
  x: x2,
  y: y2,
  name: 'Trace2',
};
const histogramData = [histogramTrace1, histogramTrace2];

const histogramLayout = {
  title: 'Histogram',
};

/*
* Mock data for pie chart
*
*/
const pieData = [{
  values: [19, 26, 55],
  labels: ['Residential', 'Non-Residential', 'Utility'],
  type: 'pie',
}];

const pieLayout = {
  height: 400,
  width: 500,
};

module.exports = {
  defaultData,
  defaultLayout,
  scatterData,
  scatterLayout,
  histogramData,
  histogramLayout,
  pieData,
  pieLayout,
};
