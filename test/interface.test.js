const { assert, expect } = require('chai');
const graphAPI = require('../index');

describe('Integration Tests', () => {
  it('expects invalid command error', (done) => {
    graphAPI.editChart('', {}, (error, result) => {
      assert.exists(error);
      expect(error.message).to.equal('Invalid command');
      assert.notExists(result);
      done();
    });
  });
  it('expects missing chart property error, missing layout', (done) => {
    graphAPI.editChart('set title to Test', { data: [] }, (error, result) => {
      assert.exists(error);
      expect(error.message).to.equal('Data or layout missing');
      assert.notExists(result);
      done();
    });
  });
  it('expects missing chart property error, missing data', (done) => {
    graphAPI.editChart('set title to Test', { layout: {} }, (error, result) => {
      assert.exists(error);
      expect(error.message).to.equal('Data or layout missing');
      assert.notExists(result);
      done();
    });
  });
  it('expects invalid data error', (done) => {
    graphAPI.editChart('set title to Test', { data: [], layout: {} }, (error, result) => {
      assert.exists(error);
      expect(error.message).to.equal('Data array cant be empty');
      assert.notExists(result);
      done();
    });
  });
  it('expects invalid layout error', (done) => {
    const testData = [{
      type: 'bar',
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
      marker: {
        color: 'red',
      },
      name: 'Trace 1',
    }];
    graphAPI.editChart('set title to Test', { data: testData, layout: {} }, (error, result) => {
      assert.exists(error);
      expect(error.message).to.equal('Layout cant be empty');
      assert.notExists(result);
      done();
    });
  });
  it('expects calculated chart', (done) => {
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
    graphAPI.editChart('set title to "Test"', { data, layout }, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.layout.title).to.equal('Test');
      done();
    });
  });
});
