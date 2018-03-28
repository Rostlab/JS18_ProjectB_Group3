const chai = require('chai');
const dirtyChai = require('dirty-chai');

const { assert, expect } = chai;
chai.use(dirtyChai);
const inputProcessing = require('../app/assets/scripts/inputProcessing');

const barChart = {
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
  ],
  layout: {
    title: 'test',
  },
};

const scatterPlot = {
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

const pieChart = {
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

describe('Input Processing Tests', () => {
  it('expects invalid command error', (done) => {
    inputProcessing.process('', {}, (error, result) => {
      assert.exists(error);
      expect(error.message).to.equal('Invalid command');
      assert.notExists(result);
      done();
    });
  });
  it('expects missing chart property error, missing layout', (done) => {
    inputProcessing.process('set title to Test', { data: [] }, (error, result) => {
      assert.exists(error);
      expect(error.message).to.equal('Data or layout missing');
      assert.notExists(result);
      done();
    });
  });
  it('expects missing chart property error, missing data', (done) => {
    inputProcessing.process('set title to Test', { layout: {} }, (error, result) => {
      assert.exists(error);
      expect(error.message).to.equal('Data or layout missing');
      assert.notExists(result);
      done();
    });
  });
  it('expects invalid data error', (done) => {
    inputProcessing.process('set title to Test', { data: [], layout: {} }, (error, result) => {
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
    inputProcessing.process('set title to Test', { data: testData, layout: {} }, (error, result) => {
      assert.exists(error);
      expect(error.message).to.equal('Layout cant be empty');
      assert.notExists(result);
      done();
    });
  });
  it('expects to set title', (done) => {
    inputProcessing.process('set title to Test', barChart, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.layout.title).to.equal('Test');
      done();
    });
  });
  it('expects to set title of x-axis', (done) => {
    inputProcessing.process('set title of x-axis to X', barChart, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.layout.xaxis.title).to.equal('X');
      done();
    });
  });
  it('expects to set title of y-axis', (done) => {
    inputProcessing.process('set title of y-axis to Y', barChart, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.layout.yaxis.title).to.equal('Y');
      done();
    });
  });
  it('expects to set range of x-axis to 0,100', (done) => {
    inputProcessing.process('set range of x-axis to 0,100', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.layout.xaxis.range[0]).to.equal('0');
      expect(result.layout.xaxis.range[1]).to.equal('100');
      done();
    });
  });
  it('expects to set range of y-axis to 0,120', (done) => {
    inputProcessing.process('set range of y-axis to 0,120', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.layout.yaxis.range[0]).to.equal('0');
      expect(result.layout.yaxis.range[1]).to.equal('120');
      done();
    });
  });
  it('expects to set width of bar to 10', (done) => {
    inputProcessing.process('set width of bar to 10', barChart, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].width).to.equal('10');
      done();
    });
  });
  it('expects to set width of line to 7', (done) => {
    inputProcessing.process('Trace1: set width of line to 7', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].line.width).to.equal('7');
      done();
    });
  });
  it('expects to set color of line to red', (done) => {
    inputProcessing.process('Trace1: set color of line to red', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].line.color).to.equal('red');
      done();
    });
  });
  it('expects to set size of marker to 6', (done) => {
    inputProcessing.process('Trace1: set width of dot to 6', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].marker.size).to.equal('6');
      done();
    });
  });
  it('expects to set color of marker to green', (done) => {
    inputProcessing.process('Trace1: set color of dot to green', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].marker.color).to.equal('green');
      done();
    });
  });
  it('expects to set opacity of marker to 0.3', (done) => {
    inputProcessing.process('Trace1: set opacity to 0.3', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].marker.opacity).to.equal('0.3');
      done();
    });
  });
  it('expects to set symbol of marker to star', (done) => {
    inputProcessing.process('Trace1: set symbol to star', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].marker.symbol).to.equal('star');
      done();
    });
  });
  it('expects to set mode to lines', (done) => {
    inputProcessing.process('Trace1: set mode to lines', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].mode).to.equal('lines');
      done();
    });
  });
  it('expects to set line type to dash', (done) => {
    inputProcessing.process('Trace1: set dash to dash', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].line.dash).to.equal('dash');
      done();
    });
  });
  it('expects to set size of legend', (done) => {
    inputProcessing.process('set size of legend to 20', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.layout.legend.font.size).to.equal('20');
      done();
    });
  });
  it('expects to set position of legend', (done) => {
    inputProcessing.process('set position of legend to 0,0', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.layout.legend.x).to.equal('0');
      expect(result.layout.legend.y).to.equal('0');
      done();
    });
  });
  it('expects to set color of gridlines of x-axis to red', (done) => {
    inputProcessing.process('set color of gridlines of x-axis to red', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.layout.xaxis.gridcolor).to.equal('red');
      done();
    });
  });
  it('expects to set color of gridlines of y-axis to red', (done) => {
    inputProcessing.process('set color of gridlines of y-axis to red', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.layout.yaxis.gridcolor).to.equal('red');
      done();
    });
  });
  it('expects to set width of gridlines of x-axis to 3', (done) => {
    inputProcessing.process('set width of gridlines of x-axis to 3', scatterPlot, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.layout.xaxis.gridwidth).to.equal('3');
      done();
    });
  });
  it('expects to set color of pie chart elements to green,yellow,pink', (done) => {
    inputProcessing.process('set color to green,yellow,pink', pieChart, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].marker.colors).to.deep.equal(['green', 'yellow', 'pink']);
      done();
    });
  });
  it('expects to set info type to percent', (done) => {
    inputProcessing.process('set info type to percent', pieChart, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].hoverinfo).to.equal('percent');
      expect(result.data[0].textinfo).to.equal('percent');
      done();
    });
  });
  it('expects to calculate average pay rate for each gender', (done) => {
    const chart = {
      data: [
        {
          type: 'scatter',
          x: ['Male', 'Male', 'Male', 'Male', 'Female', 'Female', 'Female', 'Female'],
          y: [16, 18, 14, 10, 40, 42, 32, 28],
          name: 'Trace1',
          mode: 'markers',
        },
      ],
      layout: {
        title: 'Average Pay Rate',
        showlegend: true,
        xaxis: {
          title: 'Gender',
        },
        yaxis: {
          title: 'Pay Rate',
        },
      },
    };
    inputProcessing.process('Trace1: plot average Pay Rate of Gender', chart, (error, result) => {
      assert.notExists(error);
      assert.exists(result);
      expect(result.data[0].type).to.equal('bar');
      expect(result.data[0].name).to.equal('Trace1');
      expect(result.layout.title).to.deep.equal('Average Pay Rate');
      expect(result.layout.showlegend).to.be.true();
      expect(result.layout.xaxis.title).to.deep.equal('Gender');
      expect(result.layout.yaxis.title).to.deep.equal('Pay Rate');
      expect(result.data[0].x).to.deep.equal(['Male', 'Female']);
      expect(result.data[0].y).to.deep.equal([14.5, 35.5]);
      done();
    });
  });
});
