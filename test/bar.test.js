const { expect } = require('chai');
const BarTrace = require('../data/barTrace');
const Bar = require('../charts/bar');

describe('BarChart Tests', () => {
  it('expects a BarTrace object', () => {
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
    const barTrace = new BarTrace(x, y, 'red', 'Trace 1', 0.3);
    expect(barTrace.type).to.equal('bar');
    expect(barTrace.x).to.have.lengthOf(3);
    expect(barTrace.y).to.have.lengthOf(3);
    expect(barTrace.width).to.equal(0.3);
    expect(barTrace.marker.color).to.equal('red');
    expect(barTrace.name).to.equal('Trace 1');
    const testData = {
      type: 'bar',
      x,
      y,
      marker: {
        color: 'red',
      },
      name: 'Trace 1',
      width: 0.3
    };
    expect(barTrace.getTraceData()).to.deep.equal(testData);
  });

  it('expects a Bar Chart object', () => {
    const trace = {
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
      color: 'red',
      name: 'Trace 1',
      width: 0.3
    };
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
    const testBarChart = new Bar(layout, [trace]);
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
      width: 0.3,
      name: 'Trace 1',
    }];
    console.log(testBarChart.layout);
    expect(testBarChart.layout).to.deep.equal(layout);
    expect(testBarChart.data).to.deep.equal(testData);
  });
});
