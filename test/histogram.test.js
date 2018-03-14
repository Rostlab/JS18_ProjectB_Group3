const { expect } = require('chai');
const HistogramTrace = require('../data/histogramTrace');
const Histogram = require('../charts/histogram');

describe('HistogramChart Tests', () => {
  it('expects a HistogramTrace object', () => {
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

    const trace = {
      x: x1,
      y: y1,
      name: 'Trace1',
    };

    const histogramTrace = new HistogramTrace(trace);
    expect(histogramTrace.type).to.equal('histogram');
    expect(histogramTrace.x).to.have.lengthOf(x1.length);
    expect(histogramTrace.y).to.have.lengthOf(y1.length);
    expect(histogramTrace.name).to.equal('Trace1');
  });

  it('expects a Histogram Chart object', () => {
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
      autobinx: true,
      marker: {
        color: undefined,
      },
      type: 'histogram',
      xbins: {
        end: undefined,
        size: undefined,
        start: undefined,
      },
      ybins: {
        end: undefined,
        size: undefined,
        start: undefined,
      },
    };

    const histogramTrace2 = {
      x: x2,
      y: y2,
      name: 'Trace2',
      autobinx: true,
      marker: {
        color: undefined,
      },
      type: 'histogram',
      xbins: {
        end: undefined,
        size: undefined,
        start: undefined,
      },
      ybins: {
        end: undefined,
        size: undefined,
        start: undefined,
      },
    };
    const histogramData = [histogramTrace1, histogramTrace2];

    const histogramLayout = {
      title: 'Histogram',
      barmode: 'overlay',
      legend: {
        font: {
          size: 12,
        },
        x: 1,
        y: 1,
      },
      showlegend: true,
      xaxis: {
        range: undefined,
        showgrid: true,
        title: 'X Axis',
      },
      yaxis: {
        range: undefined,
        showgrid: true,
        title: 'Y Axis',
      },

    };
    const testHistogramChart = new Histogram(histogramLayout, histogramData);
    expect(testHistogramChart.layout).to.deep.equal(histogramLayout);
    expect(testHistogramChart.data).to.deep.equal(histogramData);
  });
});
