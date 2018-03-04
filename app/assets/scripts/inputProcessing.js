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


// processes the nlp input
function process(input, data){

  // console.log("PRINT INPUT IN PROCESSING: ", input);
  // console.log("PRINT DATA IN PROCESSING: ", data);


  for(let rule of regexes) {
    console.log("PRINT REGEX OUTPUT TEST: ", rule.regex.test(input));
    if(rule.regex.test(input)) {
      console.log("PRINT REGEX OUTPUT EXEC: ", rule.regex.exec(input));
      console.log("TEST");
      // NO default rule yet, instantiates empty chart if null match
       let lib = new modules[rule.command](data, rule.arguments(rule.regex.exec(input)));
       return lib.apply();
    }
  }

  return false;
};


module.exports = {
  process: process
};
