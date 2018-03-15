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
            opacity: undefined,
            symbol: undefined,
            color: 'red',
            size: '5',
          },
          line: {
            dash: undefined,
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
            opacity: undefined,
            symbol: undefined,
            color: 'blue',
            size: 8,
          },
          line: {
            dash: undefined,
            color: 'blue',
            width: 3,
          },
        },
      ],
      layout: {
        title: 'Scatter Plot',
        xaxis: {
          range: undefined,
          title: 'X Axis',
          showgrid: true,
          gridcolor: 'black',
          gridwidth: 3,
        },
        yaxis: {
          range: undefined,
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
        },
      ],
      layout: {
        title: 'test',
        xaxis: {
          title: 'X Axis',
          showgrid: true,
          gridcolor: 'black',
          gridwidth: 3,
        },
        yaxis: {
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
    const barChart = chartFactory.create(chart.data[0].type, chart);
    // TODO remove color param from barTrace constructor, add marker
    delete chart.data[0].color;
    delete chart.data[1].color;
    expect(barChart.constructor.name).to.equal('Bar');
    expect(barChart.data).to.deep.equal(chart.data);
    expect(barChart.layout).to.deep.equal(chart.layout);
  });
});
