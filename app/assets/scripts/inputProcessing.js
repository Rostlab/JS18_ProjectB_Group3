/*
* this module is for input processing of the natural language
*/
const _ = require('lodash');
const modules = require('./modules');
const ChartFactory = require('../../helpers/chartFactory');

var regexes = [
  {
    regex: /^(change|set) title to (.*?)$/im,
    command: 'changeTitle',
    arguments: function(matches) {
      return {newTitle: matches[2]};
    }
  },
  {
    regex: /^(change|set) title of (x|y)-axis to (.*?)$/im,
    command: 'changeAxisTitle',
    arguments: function(matches) {
      return {axis: matches[2], newTitle: matches[3]};
    }
  },
  {
    regex: /^(change|set) (width) of bar to (.*?)$/im,
    command: 'changeBarWidth',
    arguments: function(matches) {
      return {newBarWidth: matches[3]};
    }
  },
  {
    regex: /^(change|set) range of (x|y)-axis to (.*),(.*)$/im,
    command: 'changeAxisRange',
    arguments: (matches) => {
      return {
        axis: matches[2],
        newValue: [matches[3], matches[4]]
      };
    }
  },
  {
    regex: /(change|set) position of legend to (.*),(.*)$/im,
    command: 'changeLegendPosition',
    arguments: (matches) => {
      return {
        newXValue: matches[2],
        newYValue: matches[3]
      };
    }
  },
  {
    regex: /(.*?): (change|set) color of (marker|line) to (.*?)$/im,
    command: 'changeScatterColor',
    arguments: (matches) => {
      return {
        name: matches[1],
        attribute: _.lowerCase(matches[3]),
        newValue: _.lowerCase(matches[4])
      };
    }
  },
  {
    regex: /(.*?): (change|set) (width|size) of (marker|line) to (.*?)$/im,
    command: 'changeScatterSize',
    arguments: (matches) => {
      return {
        name: matches[1],
        attribute: _.lowerCase(matches[4]),
        newValue: matches[5]
      };
    }
  },
  {
    regex: /(.*?): (change|set) mode to (.*?)$/im,
    command: 'changeScatterConnectionLines',
    arguments: (matches) => {
      return {
        name: matches[1],
        newValue: _.lowerCase(matches[3])
      };
    }
  },
  {
    regex: /(.*?): (change|set) dash to (.*?)$/im,
    command: 'changeScatterLineDash',
    arguments: (matches) => {
      return {
        name: matches[1],
        newValue: _.lowerCase(matches[3])
      };
    }
  },
  {
    regex: /(.*?): (change|set) start,end,size of (x|y)-axis to (.*),(.*),(.*)$/im,
    command: 'changeBinNumber',
    arguments: (matches) => {
      return {
        name: matches[1],
        axis: matches[3],
        newStart: matches[4],
        newEnd: matches[5],
        newSize: matches[6],
      };
    }
  },
  {
    regex: /(.*?): (change|set) opacity to (.*?)$/im,
    command: 'changeScatterMarkerOpacity',
    arguments: (matches) => {
      return {
        name: matches[1],
        newValue: matches[3]
      };
    }
  },
  {
    regex: /(.*?): (change|set) symbol to (.*?)$/im,
    command: 'changeScatterSymbol',
    arguments: (matches) => {
      return {
        name: matches[1],
        newValue: _.lowerCase(matches[3])
      };
    }
  },
  {
    regex: /(change|set) size of legend to (.*?)$/im,
    command: 'changeLegendSize',
    arguments: (matches) => {
      return {
        newValue: matches[2]
      };
    }
  },
  {
    regex: /^(change|set) color to (.*?)$/im,
    command: 'changePieChartColor',
    arguments: (matches) => {
      return {
        newValue: matches[2].split(',')
      };
    }
  },
  {
    regex: /^(change|set) color of gridlines of (x|y)-axis to (.*?)$/im,
    command: 'changeGridlinesColor',
    arguments: (matches) => {
      return {
        axis: matches[2],
        newValue: _.lowerCase(matches[3])
      };
    }
  },
  {
    regex: /^(change|set) (width|size) of gridlines of (x|y)-axis to (.*?)$/im,
    command: 'changeGridlinesSize',
    arguments: (matches) => {
      return {
        axis: matches[3],
        newValue: matches[4]
      };
    }
  },
  {
    regex: /^(change|set) info type to (.*?)$/im,
    command: 'changePieChartInfoType',
    arguments: (matches) => {
      return {
        newValue: matches[2]
      };
    }
  },
  {
    regex: /^(.*?): plot average (.*?) of (.*?)$/im,
    command: 'calculateAverage',
    arguments: (matches) => {
      return {
        name: matches[1],
        groupAxisName: matches[3]
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

  for(let rule of regexes) {
    if(rule.regex.test(input)) {
      // NO default rule yet, instantiates empty chart if null match
      let calculatedChart = modules[rule.command](chart, rule.arguments(rule.regex.exec(input)));
      if (calculatedChart instanceof Error) {
        callback(calculatedChart);
        return;
      }
      callback(null, _.pick(calculatedChart, ['data', 'layout']));
      return;
    }
  }

  return callback(new Error('Command not found'));
};


module.exports = {
  process: process
};
