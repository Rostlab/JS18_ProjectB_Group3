var plotGraph = angular.module('plotGraph', []);


function mainController($scope, $http) {
  $scope.command = '';
  $scope.examples = ['Bar', 'Scatter', 'Histogram', 'Pie', 'Line'];
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
        //console.log(chart);
        if (!chart.title) {
          inputAlert();
        } else {
          $scope.chart.data = chart.data;
          $scope.chart.layout = chart.layout;
          // change newPlot to Plotly.restlye?
          Plotly.newPlot('plot', chart.data, chart.layout);
          $scope.command = '';



        }


      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };







  var changeTitle = '\n - change title to <new title>';
  var setTitle = '\n - set title to <new title>';
  var setXAxisTitle = '\n - change title of x-axis to <new title>';
  var setYAxisTitle = '\n - change title of y-axis to <new title>';
  var setScatterLineThick = '\n - Trace1: set width of line to 10 (currently just for Scatter Plot)';
  var setBarWidth = '\n - change width of bar to <new width>';




  function inputAlert() {
    alert("Wront input! \n\nvalid inputs are: " +
      changeTitle +
      setTitle +
      setXAxisTitle +
      setYAxisTitle +
      setScatterLineThick +
      setBarWidth);
  }






}
