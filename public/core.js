var plotGraph = angular.module('plotGraph', []);

function mainController($scope, $http) {
  $scope.command = '';
  $scope.examples = ['Bar', 'Scatter', 'Histogram', 'Pie', 'Average'];
  // save the current chart object and send it with the command in the post request
  $scope.chart = {
    data: undefined,
    layout: undefined
  };
  var loadExample = (example) => {
    $http.get('/graph', {
        params: {
          example: example
        }
      })
      .success(function(chart) {
        // initialize chart object
        $scope.chart.data = chart.data;
        $scope.chart.layout = chart.layout;
        Plotly.newPlot('plot', chart.data, chart.layout);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  loadExample('Bar');

  $scope.selectExample = function(item) {
    loadExample(item);
  };

  $scope.createGraph = function() {
    // send the command and the current chart object in the post request
    $http.post('/graph', {
        input: $scope.command,
        chart: $scope.chart
      })
      .success(function(chart) {
        $scope.chart.data = chart.data;
        $scope.chart.layout = chart.layout;
        // change newPlot to Plotly.restlye?
        Plotly.newPlot('plot', chart.data, chart.layout);
        $scope.command = '';
      })
      .error(function(err) {
        console.log('Error: ' + err);
        inputAlert();
      });
  };


  function inputAlert() {
    alert("Wrong input! \n\nPlease enter a valid command");
  }
}
