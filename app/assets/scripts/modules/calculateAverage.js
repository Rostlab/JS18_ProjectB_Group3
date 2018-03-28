/*
* test module for calculating average value of an axis
*/
const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setBarChart = (chart, params) => {
  try{
    _.each(chart.data, (d) => {
      if (d.name === params.name) {
        let numbers = {};
        let targetAxis = 'x';
        if (chart.layout.yaxis.title === params.groupAxisName) {
          targetAxis = 'y';
        }
        _.each(d[targetAxis], (value, index) => {
          if (!numbers.hasOwnProperty(value)) {
            numbers[value] = {
              count: 0,
              sum: 0
            };
          }
          numbers[value]['count'] += 1;
          if (targetAxis === 'x') {
            numbers[value]['sum'] += d.y[index];
          } else {
            numbers[value]['sum'] += d.x[index];
          }
        });
        let newData = {
          type: 'bar',
          name: d.name,
          x: [],
          y: [],
        };
        _.forEach(numbers, function(value, key) {
          newData.x.push(key);
          newData.y.push((numbers[key].sum / numbers[key].count));
        });
        chart.data = [newData];
      }
    });
  } catch (error) {
    return error;
  }

  const chartFactory = new ChartFactory();
  const editBar = chartFactory.create('bar', chart);

  return editBar;
};

module.exports = setBarChart;

