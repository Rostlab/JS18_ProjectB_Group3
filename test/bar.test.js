const { expect } = require('chai');
const BarTrace = require('../data/barTrace');
const Bar = require('../charts/bar');

describe('BarChart Tests', () => {
  it('expects create BarTrace object', () => {
    const x = [
      'giraffes',
      'orangutans',
      'monkeys',
    ];
    const y = [
      20,
      14,
      23,
    ];
    const barTrace = new BarTrace(x, y, 'red', 'Trace 1');
    expect(barTrace.type).to.equal('bar');
    expect(barTrace.x).to.have.lengthOf(3);
    expect(barTrace.y).to.have.lengthOf(3);
    expect(barTrace.color).to.equal('red');
    expect(barTrace.name).to.equal('Trace 1');
    const testData = {
      type: 'bar',
      x,
      y,
      marker: {
        color: 'red',
      },
      name: 'Trace 1',
    };
    expect(barTrace.getTraceData()).to.deep.equal(testData);
  });

  it('expects create Bar Chart object', () => {
    const x = [
      'giraffes',
      'orangutans',
      'monkeys',
    ];
    const y = [
      20,
      14,
      23,
    ];
    const barTrace = new BarTrace(x, y, 'red', 'Trace 1');
    const layout = {
      title: 'Test Chart',
      xaxis: {
        title: 'X Axis',
        showgrid: true,
      },
      yaxis: {
        title: 'Y Axis',
        showgrid: true,
      },
      showlegend: true,
      legend: {
        x: 1,
        y: 1,
        font: {
          size: 12,
        },
      },
    };
    const testBarChart = new Bar([barTrace.getTraceData()], layout);
    expect(testBarChart.layout).to.deep.equal(layout);
    expect(testBarChart.data).to.deep.equal([barTrace.getTraceData()]);
  });
});
