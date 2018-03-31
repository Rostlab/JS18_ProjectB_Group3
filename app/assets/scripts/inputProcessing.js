/*
* this module is for input processing of the natural language
*/
const _ = require('lodash');
const modules = require('./modules');
const ChartFactory = require('../../helpers/chartFactory');

const newValueCalculator = (matches) => {
  let newValue = '';
  _.each(matches, (match) => {
    if (_.startsWith(match, '"') && _.endsWith(match, '"')) {
      newValue = _.trim(match, '"');
    }
  });

  return newValue;
};

const axisFinder = (matches) => {
  let axisName = '';
  _.each(matches, (match) => {
    if (match === 'x axis' || match === 'x-axis') {
      axisName = 'x';
    } else if (match === 'y axis' || match === 'y-axis') {
      axisName = 'y';
    }
  });

  return axisName;
};

const attributeFinder = (matches) => {
  let attribute = '';
  _.each(matches, (match) => {
    if (match === 'line') {
      attribute = 'line';
    } else if (match === 'marker') {
      attribute = 'marker';
    }
  });

  return attribute;
};

var regexes = [
  {
    regex: /(?:[\s]|^)(title|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeTitle',
    arguments: function(matches) {
      return {
        newTitle: newValueCalculator(matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(title|x axis|y axis|x-axis|y-axis|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeAxisTitle',
    arguments: function(matches) {
      return {
        axis: axisFinder(matches),
        newTitle: newValueCalculator(matches)};
    }
  },
  {
    regex: /(?:[\s]|^)(width|bar|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeBarWidth',
    arguments: function(matches) {
      return {
        newBarWidth: newValueCalculator(matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(range|x axis|y axis|x-axis|y-axis|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeAxisRange',
    arguments: (matches) => {
      return {
        axis: axisFinder(matches),
        newValue: _.words(newValueCalculator(matches), /[^,\s;]+/g)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(position|legend|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeLegendPosition',
    arguments: (matches) => {
      let newPosition = _.words(newValueCalculator(matches), /[^,\s;]+/g);
      return {
        newXValue: newPosition[0],
        newYValue: newPosition[1]
      };
    }
  },
  {
    regex: /(?:[\s]|^)(color|marker|line|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeScatterColor',
    arguments: (matches, dataName) => {
      return {
        name: dataName,
        attribute: attributeFinder(matches),
        newValue: newValueCalculator(matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(width|size|marker|line|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeScatterSize',
    arguments: (matches, dataName) => {
      return {
        name: dataName,
        attribute: attributeFinder(matches),
        newValue: newValueCalculator(matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(mode|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeScatterConnectionLines',
    arguments: (matches, dataName) => {
      return {
        name: dataName,
        newValue: newValueCalculator(matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(dash|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeScatterLineDash',
    arguments: (matches, dataName) => {
      return {
        name: dataName,
        newValue: newValueCalculator(matches)
      };
    }
  },
  // TODO improve this. Try to match the order of start,end and size to entered values
  {
    regex: /(?:[\s]|^)(start|end|size|x axis|y axis|x-axis|y-axis|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeBinNumber',
    arguments: (matches, dataName) => {
    let newBinNumber = _.words(newValueCalculator(matches), /[^,\s;]+/g);
      return {
        name: dataName,
        axis: axisFinder(matches),
        newStart: newBinNumber[0],
        newEnd: newBinNumber[1],
        newSize: newBinNumber[2],
      };
    }
  },
  {
    regex: /(?:[\s]|^)(opacity|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeScatterMarkerOpacity',
    arguments: (matches, dataName) => {
      return {
        name: dataName,
        newValue: newValueCalculator(matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(symbol|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeScatterSymbol',
    arguments: (matches, dataName) => {
      return {
        name: dataName,
        newValue: newValueCalculator(matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(legend|size|width|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeLegendSize',
    arguments: (matches) => {
      return {
        newValue: newValueCalculator(matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(colors|pie|"([^"]*)")(?=[\s]|$)/g,
    command: 'changePieChartColor',
    arguments: (matches) => {
      return {
        newValue: _.words(newValueCalculator(matches), /[^,\s;]+/g)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(color|gridlines|x axis|y axis|x-axis|y-axis|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeGridlinesColor',
    arguments: (matches) => {
      return {
        axis: axisFinder(matches),
        newValue: newValueCalculator(matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(width|size|gridlines|x axis|y axis|x-axis|y-axis|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeGridlinesSize',
    arguments: (matches) => {
      return {
        axis: axisFinder(matches),
        newValue: newValueCalculator(matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(info|type|hover|text|"([^"]*)")(?=[\s]|$)/g,
    command: 'changePieChartInfoType',
    arguments: (matches) => {
      return {
        newValue: newValueCalculator(matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(average|"([^"]*)")(?=[\s]|$)/g,
    command: 'calculateAverage',
    arguments: (matches, dataName, targetAxis) => {
      return {
        name: dataName,
        targetAxis: targetAxis
      };
    }
  },
];

// processes the nlp input
function process(input, plotlyObject, callback){
  if (!_.isString(input) || input === '') {
    const invalidCommand = new Error('Invalid command');
    callback(invalidCommand, null);
    return;
  }
  if (!Object.prototype.hasOwnProperty.call(plotlyObject, 'data') ||
    !Object.prototype.hasOwnProperty.call(plotlyObject, 'layout')) {
    const missingChartProperty = new Error('Data or layout missing');
    callback(missingChartProperty, null);
    return;
  }
  if (_.isEmpty(plotlyObject.data)) {
    const invalidDataProperty = new Error('Data array cant be empty');
    callback(invalidDataProperty, null);
    return;
  }
  if (_.isEmpty(plotlyObject.layout)) {
    const invalidLayoutProperty = new Error('Layout cant be empty');
    callback(invalidLayoutProperty, null);
    return;
  }
  if (!plotlyObject.data[0].type || plotlyObject.data[0].type === '') {
    const invalidChartType = new Error('Invalid chart type');
    callback(invalidChartType, null);
    return;
  }

  const chartFactory = new ChartFactory();
  const chart = chartFactory.create(plotlyObject.data[0].type, plotlyObject);
  // TODO dataName and targetAxis should be removed after finding a better way to extract them from input
  let longestMatch = {
    matches: [],
    rule: {},
    dataName: '',
    targetAxis: '',
  };
  for(let rule of regexes) {
    if(rule.regex.test(input)) {
      // NO default rule yet, instantiates empty chart if null match
      let matches = input.match(rule.regex);
      if (matches.length && matches.length > longestMatch.matches.length) {
        longestMatch.matches = _.map(matches, _.trim);
        longestMatch.rule = rule;
        // TODO find a better way to extract name of data and title of axis
        _.each(_.map(chart.data, 'name'), (dataName) => {
          if (_.includes(input, dataName)) {
            longestMatch.dataName = dataName;
          }
        });
        if (chart.xaxis && chart.xaxis.title && _.includes(input, chart.xaxis.title)) {
          longestMatch.targetAxis = chart.xaxis.title;
        } else if (chart.yaxis && chart.yaxis.title && _.includes(input, chart.yaxis.title)) {
          longestMatch.targetAxis = chart.yaxis.title;
        };
      }
    }
  }

  if (longestMatch.matches.length > 0) {
    let calculatedChart = modules[longestMatch.rule.command](chart,
      longestMatch.rule.arguments(longestMatch.matches, longestMatch.dataName, longestMatch.targetAxis));
    if (calculatedChart instanceof Error) {
      callback(calculatedChart);
      return;
    }
    callback(null, _.pick(calculatedChart, ['data', 'layout']));
    return;
  }

  return callback(new Error('Command not found'));
};


module.exports = {
  process: process
};
