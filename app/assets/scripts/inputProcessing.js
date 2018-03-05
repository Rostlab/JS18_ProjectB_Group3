/*
* this module is for input processing of the natural language
*/

var modules = {
  'ChangeTitle': require('./modules/changeTitle')
};

var regexes = [
  {
    regex: /^(change|set) title to (.*?)$/im,
    command: 'ChangeTitle',
    arguments: function(matches) {
      return {newTitle: matches[2]};
    }
  },

  {
    regex: /^change title of (x|y)-axis to (.*?)$/im,
    command: 'ChangeAxisTitle',
    arguments: function(matches) {
      return {axis: matches[1], newTitle: matches[2]};
    }
  }

];


// processes the nlp input
function process(input, data){

  for(let rule of regexes) {
    
    if(rule.regex.test(input)) {

      // NO default rule yet, instantiates empty chart if null match
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
