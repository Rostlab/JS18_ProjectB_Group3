/*
* this module is for input processing of the natural language
*/
const _ = require('lodash');
const modules = require('./modules');

var regexes = [
  {
    regex: /^(change|set) title to (.*?)$/im,
    command: 'changeTitle',
    arguments: function(matches) {
      return {newTitle: matches[2]};
    }
  },
  {
    regex: /^change title of (x|y)-axis to (.*?)$/im,
    command: 'changeAxisTitle',
    arguments: function(matches) {
      return {axis: matches[1], newTitle: matches[2]};
    }
  },
  {
    regex: /(.*?): (change|set) (color|width|size) of (dot|line) to (.*?)$/im,
    command: 'changeScatterColorOrWidth',
    arguments: (matches) => {
      return {
        name: matches[1],
        option: _.lowerCase(matches[3]),
        attribute: _.lowerCase(matches[4]),
        newValue: _.lowerCase(matches[5])
      };
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
    regex: /(.*?): (change|set) start,end,size of (x|y) to (.*),(.*),(.*)$/im,
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
        newValue: _.lowerCase(matches[3])
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
];

// processes the nlp input
function process(input, data){

  for(let rule of regexes) {

    if(rule.regex.test(input)) {
      // NO default rule yet, instantiates empty chart if null match
      console.log(rule.regex.exec(input));
      return modules[rule.command](data, rule.arguments(rule.regex.exec(input)));
    }
  }

  return false;
};


module.exports = {
  process: process
};
