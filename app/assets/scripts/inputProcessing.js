/*
* this module is for input processing of the natural language
*/
const _ = require('lodash');
const modules = require('./modules');
const ChartFactory = require('../../helpers/chartFactory');
const csscolors = require('css-color-names');

/**
 * Extracting the value outside quotation marks
 * @param matches
 * @returns {string}
 */
const newValueCalculator = (matches) => {
  let newValue = '';
  _.each(matches, (match) => {
    if (_.startsWith(match, '"') && _.endsWith(match, '"')) {
      newValue = _.trim(match, '"');
    }
  });

  return newValue;
};

/**
 * Finding if the given command is specific to an axis
 * @param matches
 * @returns {string}
 */
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

/**
 * There are only 2 main components for scatter plot and line chart
 * Checks which component should be edited
 * @param matches
 * @returns {string}
 */
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

/**
 * Extract color values from given command
 * @param input
 * @returns {string}
 */
const matchColor = (input) => {
  let colorMatch = '';
  _.forEach(csscolors, (value, key) => {
    if (_.includes(input, key)) {
      colorMatch += `${key},`;
    }
  });

  return colorMatch.substring(0, colorMatch.length - 1);
};

/**
 * Extract numbers and decimals from given command
 * @param input
 * @returns {string}
 */
const extractNumbers = (input) => {
  const words = _.words(input, /[^,\s]+/g);
  let matchedValue = '';
  _.each(words, (word) => {
    if (/^\d{1,10}(\.\d{1,4})?$/g.test(word)) {
      matchedValue += `${word.match(/^\d{1,10}(\.\d{1,4})?$/g)},`;
    }
  });

  return matchedValue.substring(0, matchedValue.length - 1);
};

var regexes = [
  {
    regex: /(?:[\s]|^)(title|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeTitle',
    arguments: function(longestMatch) {
      return {
        newTitle: newValueCalculator(longestMatch.matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(title|x axis|y axis|x-axis|y-axis|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeAxisTitle',
    arguments: function(longestMatch) {
      return {
        axis: axisFinder(longestMatch.matches),
        newTitle: newValueCalculator(longestMatch.matches)};
    }
  },
  {
    regex: /(?:[\s]|^)(width|bar)(?=[\s]|$)/g,
    command: 'changeBarWidth',
    arguments: function(longestMatch) {
      return {
        newBarWidth: extractNumbers(longestMatch.input)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(range|x axis|y axis|x-axis|y-axis|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeAxisRange',
    arguments: (longestMatch) => {
      return {
        axis: axisFinder(longestMatch.matches),
        newValue: _.split(extractNumbers(longestMatch.input), ',')
      };
    }
  },
  {
    regex: /(?:[\s]|^)(position|legend|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeLegendPosition',
    arguments: (longestMatch) => {
      let newPosition = _.split(extractNumbers(longestMatch.input), ',');
      return {
        newXValue: newPosition[0],
        newYValue: newPosition[1]
      };
    }
  },
  {
    regex: /(?:[\s]|^)(color|marker|line)(?=[\s]|$)/g,
    command: 'changeScatterColor',
    arguments: (longestMatch) => {
      return {
        name: longestMatch.dataName,
        attribute: attributeFinder(longestMatch.matches),
        newValue: matchColor(longestMatch.input),
      };
    }
  },
  {
    regex: /(?:[\s]|^)(width|size|marker|line)(?=[\s]|$)/g,
    command: 'changeScatterSize',
    arguments: (longestMatch) => {
      return {
        name: longestMatch.dataName,
        attribute: attributeFinder(longestMatch.matches),
        newValue: extractNumbers(longestMatch.input)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(mode|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeScatterConnectionLines',
    arguments: (longestMatch) => {
      return {
        name: longestMatch.dataName,
        newValue: newValueCalculator(longestMatch.matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(dash|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeScatterLineDash',
    arguments: (longestMatch) => {
      return {
        name: longestMatch.dataName,
        newValue: newValueCalculator(longestMatch.matches)
      };
    }
  },
  // TODO improve this. Try to match the order of start,end and size to entered values
  {
    regex: /(?:[\s]|^)(start|end|size|x axis|y axis|x-axis|y-axis)(?=[\s]|$)/g,
    command: 'changeBinNumber',
    arguments: (longestMatch) => {
    let newBinNumber =  _.split(extractNumbers(longestMatch.input), ',');
      return {
        name: longestMatch.dataName,
        axis: axisFinder(longestMatch.matches),
        newStart: newBinNumber[0],
        newEnd: newBinNumber[1],
        newSize: newBinNumber[2],
      };
    }
  },
  {
    regex: /(?:[\s]|^)(opacity)(?=[\s]|$)/g,
    command: 'changeScatterMarkerOpacity',
    arguments: (longestMatch) => {
      return {
        name: longestMatch.dataName,
        newValue: extractNumbers(longestMatch.input)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(symbol|"([^"]*)")(?=[\s]|$)/g,
    command: 'changeScatterSymbol',
    arguments: (longestMatch) => {
      return {
        name: longestMatch.dataName,
        newValue: newValueCalculator(longestMatch.matches)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(legend|size|width)(?=[\s]|$)/g,
    command: 'changeLegendSize',
    arguments: (longestMatch) => {
      return {
        newValue: extractNumbers(longestMatch.input)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(colors|pie)(?=[\s]|$)/g,
    command: 'changePieChartColor',
    arguments: (longestMatch) => {
      return {
        newValue: _.words(matchColor(longestMatch.input), /[^,\s;]+/g)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(color|gridlines|x axis|y axis|x-axis|y-axis)(?=[\s]|$)/g,
    command: 'changeGridlinesColor',
    arguments: (longestMatch) => {
      return {
        axis: axisFinder(longestMatch.matches),
        newValue: matchColor(longestMatch.input),
      };
    }
  },
  {
    regex: /(?:[\s]|^)(width|size|gridlines|x axis|y axis|x-axis|y-axis)(?=[\s]|$)/g,
    command: 'changeGridlinesSize',
    arguments: (longestMatch) => {
      return {
        axis: axisFinder(longestMatch.matches),
        newValue: extractNumbers(longestMatch.input)
      };
    }
  },
  {
    regex: /(?:[\s]|^)(info|type|hover|text|"([^"]*)")(?=[\s]|$)/g,
    command: 'changePieChartInfoType',
    arguments: (longestMatch) => {
      return {
        newValue: newValueCalculator(longestMatch.matches)
      };
    }
  },
  // TODO Find a better way to implement this
  {
    regex: /plot average (.*?) of (.*?)$/im,
    command: 'calculateAverage',
    arguments: (longestMatch) => {
      return {
        name: longestMatch.dataName,
        targetAxis: longestMatch.matches[2]
      };
    }
  },
  {
    regex: /^(.*?): change color of bar(s)? to (.*?)$/im,
    command: 'changeBarColor',
    arguments: (matches) => {
      return {
        name: matches[1],
        newBarColor: matches[3]
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
  let longestMatch = {
    matches: [],
    rule: {},
    dataName: '',
    input: input,
  };
  // iterate through the list of available rules
  // find the best matching one
  for(let rule of regexes) {
    if(rule.regex.test(input)) {
      // NO default rule yet, instantiates empty chart if null match
      let matches = input.match(rule.regex);
      if (matches.length && matches.length > longestMatch.matches.length) {
        longestMatch.matches = _.map(matches, _.trim);
        longestMatch.rule = rule;
        // TODO find a better way to extract name of data
        _.each(_.map(chart.data, 'name'), (dataName) => {
          if (_.includes(input, dataName)) {
            longestMatch.dataName = dataName;
          }
        });
      }
    }
  }

  /**
   * Calculate the parameters of a command and execute the command
   * Pick only data and layout fields from the result
   * @returns {*}
   */
  if (longestMatch.matches.length > 0) {
    let calculatedChart = modules[longestMatch.rule.command](chart,
      longestMatch.rule.arguments(longestMatch));
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
