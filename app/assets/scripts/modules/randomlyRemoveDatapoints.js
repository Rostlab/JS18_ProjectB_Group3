/*
* module for randomly removing half the datapoints
*/
const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

/*
* returns an array of n unique numbers between 0 and (max-1)
*/
function randomIndexes(n, max) {
  let array = [];

  while(array.length < n) {
    var rand = Math.floor(Math.random() * max);

    if(array.indexOf(rand) == -1) {
      array.push(rand);
    }
  }

  return array;
}

const randomlyRemoveDatapoints = (chart, params) => {
  // get type from the first data element
  // create the chart based on this type and the current chart properties (layout and data)
 

  if(chart.data[0].type == 'scatter') {
    _.each(chart.data, (d) => {
      let indexes = randomIndexes((1 - params.percentage) * d.x.length, d.x.length);

      let x_ = [], y_ = [];

      for(let i of indexes) {
        x_.unshift(d.x[i]);
        y_.unshift(d.y[i]);
      }

      console.log(params.percentage + ' percent');

      d.x = x_;
      d.y = y_;
    });
  }    

  const chartFactory = new ChartFactory();
  const editScatter = chartFactory.create(chart.data[0].type, chart);

  return editScatter;
};

module.exports = randomlyRemoveDatapoints;
