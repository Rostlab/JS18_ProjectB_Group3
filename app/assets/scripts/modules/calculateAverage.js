/*
* test module for calculating average value of an axis
*/
const ChartFactory = require('../../../helpers/chartFactory');
const _  = require('lodash');

const setBarChart = (chart, params) => {
  _.each(chart.data, (d) => {
    if (d.name === params.name) {
      let numbers = {};
      if (chart.layout.xaxis.title === params.groupAxisName) {
        _.each(d.x, (value, index) => {
          if (numbers.hasOwnProperty(value)) {
            numbers[value]['count'] += 1;
            numbers[value]['sum'] += d.y[index];
          } else {
            numbers[value] = {
              count: 0,
              sum: 0
            };
            numbers[value]['count'] += 1;
            numbers[value]['sum'] += d.y[index];
          }
        });
      } else {
        _.each(d.y, (value, index) => {
          if (numbers.hasOwnProperty(value)) {
            numbers[value]['count'] += 1;
            numbers[value]['sum'] += d.x[index];
          } else {
            numbers[value] = {
              count: 0,
              sum: 0
            };
            numbers[value]['count'] += 1;
            numbers[value]['sum'] += d.x[index];
          }
        });
      }
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
  const chartFactory = new ChartFactory();
  const editBar = chartFactory.create('bar', chart);

  return editBar;
};

module.exports = setBarChart;

