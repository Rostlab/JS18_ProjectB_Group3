var plotGraph = angular.module('plotGraph', []);

function mainController($scope, $http) {
  $scope.command = '';

  $http.get('/graph')
    .success(function(chart) {
      $scope.grapObject = {};
      Plotly.newPlot('plot', chart._data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.createGraph = function() {
    $http.post('/graph', $scope.command)
      .success(function(data) {
        $scope.command = '';
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}