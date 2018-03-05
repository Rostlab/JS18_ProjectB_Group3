var plotGraph = angular.module('plotGraph', []);

function mainController($scope, $http) {
  $scope.command = '';

  $http.get('/graph')
    .success(function(chart) {
      $scope.grapObject = {};
      Plotly.newPlot('plot', chart.data, chart.layout);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

    $scope.createGraph = function() {
      $http.post('/graph', {input: $scope.command})
        .success(function(chart) {
          console.log("test");
          // change newPlot to Plotly.restlye?
          Plotly.newPlot('plot', chart.data, chart.layout);
          $scope.command = '';
          console.log(chart);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
  };
}
