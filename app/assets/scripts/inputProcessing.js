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
    command: 'changeColorOrWidth',
    arguments: (matches) => {
      return {
        name: matches[1],
        option: _.lowerCase(matches[3]),
        attribute: _.lowerCase(matches[4]),
        newValue: _.lowerCase(matches[5])
      };
    }
  }
];


// processes the nlp input
function process(input, data){

  for(let rule of regexes) {
    
    if(rule.regex.test(input)) {

      // NO default rule yet, instantiates empty chart if null match
      return modules[rule.command](data, rule.arguments(rule.regex.exec(input)));
    }
  }

  return false;
};


module.exports = {
  process: process
};
