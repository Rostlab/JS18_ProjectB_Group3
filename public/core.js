var plotGraph = angular.module('plotGraph', []);

function mainController($scope, $http) {
  $scope.command = '';

  $http.get('/graph')
    .success(function(data) {
      $scope.grapObject = {};
      var data = {
        "data": [
          {
            "x": [
              "giraffes",
              "orangutans",
              "monkeys"
            ],
            "y": [
              20,
              14,
              23
            ],
            "type": "bar"
          }
        ]
      };
      Plotly.newPlot('plot', data);
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