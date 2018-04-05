const { expect } = require('chai');
const ChartFactory = require('../app/helpers/chartFactory');

describe('ChartFactory Tests', () => {
  it('expects a Scatter Chart object', () => {
    const chart = {
      data: [
        {
          type: 'scatter',
          mode: 'lines+markers',
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
          marker: {
            opacity: '',
            symbol: '',
            color: 'red',
            size: '5',
          },
          line: {
            dash: '',
            color: 'red',
            width: 3,
          },
        },
        {
          type: 'scatter',
          mode: 'lines+markers',
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
          marker: {
            opacity: '',
            symbol: '',
            color: 'blue',
            size: 8,
          },
          line: {
            dash: '',
            color: 'blue',
            width: 3,
          },
        },
      ],
      layout: {
        title: 'Scatter Plot',
        xaxis: {
          range: [],
          title: 'X Axis',
          showgrid: true,
          gridcolor: 'black',
          gridwidth: 3,
        },
        yaxis: {
          range: [],
          title: 'Y Axis',
          showgrid: true,
          gridcolor: 'black',
          gridwidth: 3,
        },
        showlegend: true,
        legend: {
          x: 1,
          y: 1,
          font: {
            size: 12,
          },
        },
      },
    };
    const chartFactory = new ChartFactory();
    const scatterChart = chartFactory.create(chart.data[0].type, chart);
    expect(scatterChart.constructor.name).to.equal('Scatter');
    expect(scatterChart.data).to.deep.equal(chart.data);
    expect(scatterChart.layout).to.deep.equal(chart.layout);
  });

  it('expects a Bar Chart object', () => {
    const chart = {
      data: [
        {
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
          name: 'SF Zoo',
          marker: {
            color: 'red',
          },
          color: 'red',
          width: 0.3,
        },
        {
          type: 'bar',
          x: [
            'giraffes',
            'orangutans',
            'monkeys',
          ],
          y: [
            12,
            18,
            29,
          ],
          name: 'LA Zoo',
          marker: {
            color: 'blue',
          },
          color: 'blue',
          width: 0.3,
        },
      ],
      layout: {
        title: 'test',
        xaxis: {
          title: 'X Axis',
          showgrid: true,
          range: [],
          gridcolor: 'black',
          gridwidth: 3,
        },
        yaxis: {
          title: 'Y Axis',
          showgrid: true,
          range: [],
          gridcolor: 'black',
          gridwidth: 3,
        },
        showlegend: true,
        legend: {
          x: 1,
          y: 1,
          font: {
            size: 12,
          },
        },
      },
    };
    const chartFactory = new ChartFactory();
    const barChart = chartFactory.create(chart.data[0].type, chart);
    // TODO remove color param from barTrace constructor, add marker
    delete chart.data[0].color;
    delete chart.data[1].color;
    expect(barChart.constructor.name).to.equal('Bar');
    expect(barChart.data).to.deep.equal(chart.data);
    expect(barChart.layout).to.deep.equal(chart.layout);
  });

  it('expects a Histogram Chart object', () => {
    const x1 = [];
    const y1 = [];
    for (let i = 1; i < 500; i += 1) {
      const k = Math.random();
      x1.push(k * 5);
      y1.push(k);
    }

    const chart = {
      data: [
        {
          x: x1,
          y: y1,
          name: 'Trace1',
          autobinx: true,
          type: 'histogram',
          marker: {
            color: '',
          },
          xbins: {
            end: '',
            size: '',
            start: '',
          },
          ybins: {
            end: '',
            size: '',
            start: '',
          },
        },
      ],
      layout: {
        barmode: 'overlay',
        legend: {
          font: {
            size: 12,
          },
          x: 1,
          y: 1,
        },
        showlegend: true,
        title: 'Histogram',
        xaxis: {
          gridcolor: '',
          gridwidth: '',
          range: [],
          showgrid: true,
          title: 'X Axis',
        },
        yaxis: {
          gridcolor: '',
          gridwidth: '',
          range: [],
          showgrid: true,
          title: 'Y Axis',
        },
      },
    };
    const chartFactory = new ChartFactory();
    const histogramChart = chartFactory.create(chart.data[0].type, chart);
    expect(histogramChart.constructor.name).to.equal('Histogram');
    expect(histogramChart.data).to.deep.equal(chart.data);
    expect(histogramChart.layout).to.deep.equal(chart.layout);
  });

  it('expects a Pie Chart object', () => {
    const chart = {
      data: [{
        values: [19, 26, 55],
        labels: ['Residential', 'Non-Residential', 'Utility'],
        type: 'pie',
        marker: {
          colors: ['red', 'black', 'yellow'],
        },
        name: 'Test',
        textinfo: 'value',
        hoverinfo: 'value',
      }],
      layout: {
        height: 400,
        width: 500,
      },
    };
    const chartFactory = new ChartFactory();
    const pieChart = chartFactory.create(chart.data[0].type, chart);
    expect(pieChart.constructor.name).to.equal('Pie');
    expect(pieChart.data).to.deep.equal(chart.data);
    expect(pieChart.layout).to.deep.equal(chart.layout);
  });
});
