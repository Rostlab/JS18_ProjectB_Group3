const inputProcessing = require('../app/assets/scripts/inputProcessing');

exports.editChart = function (inputString, plotlyObject, callback) {
  inputProcessing.process(inputString, plotlyObject, (error, result) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result);
  });
};
