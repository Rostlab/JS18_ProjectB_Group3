const { expect } = require('chai');
const ScatterTrace = require('../data/scatterTrace');
const Scatter = require('../charts/scatter');

describe('ScatterChart Tests', () => {
  it('expects a ScatterTrace object', () => {
    const trace = {
      x: [
        2,
        3,
        4,
        5,
      ],
      y: [
        16,
        5,
        11,
        9,
      ],
      name: 'Trace1',
      mode: 'lines+markers',
      type: 'scatter',
      marker: {
        opacity: '',
        symbol: '',
        color: 'red',
        size: 12,
      },
      line: {
        dash: '',
        color: 'red',
        width: 10,
      },
    };
    const scatterTrace = new ScatterTrace(trace);
    expect(scatterTrace.type).to.equal('scatter');
    expect(scatterTrace.mode).to.equal('lines+markers');
    expect(scatterTrace.x).to.have.lengthOf(4);
    expect(scatterTrace.y).to.have.lengthOf(4);
    expect(scatterTrace.marker.color).to.equal('red');
    expect(scatterTrace.marker.size).to.equal(12);
    expect(scatterTrace.line.color).to.equal('red');
    expect(scatterTrace.line.width).to.equal(10);
    expect(scatterTrace.name).to.equal('Trace1');
    expect(scatterTrace.getTraceData()).to.deep.equal(trace);
  });

  it('expects a Scatter Chart object', () => {
    const trace1 = {
      x: [
        2,
        3,
        4,
        5,
      ],
      y: [
        16,
        5,
        11,
        9,
      ],
      name: 'Trace1',
      mode: 'lines+markers',
      type: 'scatter',
      marker: {
        color: 'red',
        size: 12,
      },
      line: {
        color: 'red',
        width: 10,
      },
    };
    const scatterTrace1 = new ScatterTrace(trace1);
    const trace2 = {
      x: [
        1,
        2,
        3,
        4,
      ],
      y: [
        12,
        9,
        15,
        12,
      ],
      name: 'Trace2',
      mode: 'lines+markers',
      type: 'scatter',
      marker: {
        color: 'blue',
        size: 8,
      },
      line: {
        color: 'blue',
        width: 3,
      },
    };
    const scatterTrace2 = new ScatterTrace(trace2);
    const layout = {
      title: 'Scatter Plot',
      xaxis: {
        gridcolor: '',
        gridwidth: '',
        range: '',
        title: 'X Axis',
        showgrid: true,
      },
      yaxis: {
        gridcolor: '',
        gridwidth: '',
        range: '',
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
    const testScatterChart = new Scatter(layout, [scatterTrace1, scatterTrace2]);
    expect(testScatterChart.layout).to.deep.equal(layout);
    expect(testScatterChart.data).to.deep.equal([scatterTrace1, scatterTrace2]);
  });
});
