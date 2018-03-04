/*
* this module is for input processing of the natural language
*/

var modules = {
  'ChangeTitle': require('./modules/changeTitle')
};

var regexes = [
  {
    regex: /^change|set title to (.*?)$/igm,
    command: 'ChangeTitle',
    arguments: function(matches) {
      return {newTitle: matches[1]};
    }
  },

  {
    regex: /^change title of (x|y)-axis to (.*?)$/igm,
    command: 'ChangeAxisTitle',
    arguments: function(matches) {
      return {axis: matches[1], newTitle: matches[2]};
    }
  }

];

// var match = require('js-pattern-matching');
// var natural = require('natural');
// var tokenizer = new natural.WordTokenizer();

// js-pattern-matching pattern for matching array ... some error here
// const getIndexOfKeyWord = (array) =>  match (array) (
//   (array.includes('title')) => array.indexOf('title'),
//   //(v= "hello") => "A greeting"
// )
// function getIndexOfKeyWord(array){
//   if (array.includes('title')){
//     return array.indexOf('title')
//   }
// }

// processes the nlp input
function process(input, data){
  // tokenize input
  // var processedInput = tokenizer.tokenize(input);


  for(let rule of regexes) {
    if(rule.regex.test(input)) {
      console.log(rule.regex.exec(input));
       let lib = new modules[rule.command](data, rule.arguments(rule.regex.exec(input)));
       return lib.apply();
    }
  }

  return false;
};


module.exports = {
  process: process
};
