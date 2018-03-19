const { expect } = require('chai');
const PieTrace = require('../data/pieTrace');
const Pie = require('../charts/pie');

describe('PieChart Tests', () => {
  it('expects a PieTrace object', () => {
    const trace = {
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie',
      marker: {
        colors: ['red', 'black', 'yellow'],
      },
      name: 'Test',
      textinfo: 'value',
      hoverinfo: 'value',
    };
    const pieTrace = new PieTrace(trace);
    expect(pieTrace.type).to.equal('pie');
    expect(pieTrace.getTraceData()).to.deep.equal(trace);
  });

  it('expects a Pie Chart object', () => {
    const trace = {
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie',
      marker: {
        colors: ['red', 'black', 'yellow'],
      },
      name: 'Test',
      textinfo: 'value',
      hoverinfo: 'value',
    };
    const layout = {
      height: 400,
      width: 500,
    };
    const testPieChart = new Pie(layout, [trace]);
    expect(testPieChart.layout).to.deep.equal(layout);
    expect(testPieChart.data).to.deep.equal([trace]);
  });
});
