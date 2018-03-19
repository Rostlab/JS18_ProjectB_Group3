var plotGraph = angular.module('plotGraph', []);

function mainController($scope, $http) {
  $scope.command = '';
  $scope.examples = ['Bar', 'Scatter', 'Histogram', 'Pie'];
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

  var changeTitle = '\n - change title to <new title>';
  var setTitle = '\n - set title to <new title>';
  var setXAxisTitle = '\n - change title of x-axis to <new title>';
  var setYAxisTitle = '\n - change title of y-axis to <new title>';
  var setScatterLineThick = '\n - Trace1: set width of line to 10 (currently just for Scatter Plot)';  
  var setBarWidth = '\n - change width of bar to <new width>';
  var setHistogramBinNumber = '\n - (change bin number) Trace1: set start,end,size of x to 0,20,0.5 (currently just for Histogram)';
  var setScatterConnectionLines = '\n - Trace1: set mode to lines (currently just for Scatter Plot)';
  var setScatterDashType = '\n - Trace1: set dash to dash (currently just for Scatter Plot)';
  var setScatterMarkerOpacity = '\n - Trace1: set opacity to 0.8 (currently just for Scatter Plot)';
  var setScatterMarkerSymbol = '\n - Trace1: set symbol to dot (currently just for Scatter Plot)';
  var setLegendSize = '\n - set/change size of legend to <new size>';
  var setLegendPosition = '\n - change title of y-axis to <new position> (e.g. 1,1)';
  var setXAxisGridlinesColor = '\n - Trace1: set color of gridlines of x-axis to red';
  var setPieChartColor = '\n - set color to red,black,yellow';
  var setPieChartInfoType = '\n - set info type to value';


  function inputAlert() {
    alert("Wrong input! \n\nvalid inputs are: " +
      changeTitle +
      setTitle +
      setXAxisTitle +
      setYAxisTitle +
      setScatterLineThick +
      setBarWidth +
      setHistogramBinNumber +
      setScatterConnectionLines +
      setScatterDashType +
      setScatterMarkerOpacity +
      setScatterMarkerSymbol +
      setLegendSize +
      setLegendPosition +
      setXAxisGridlinesColor +
      setPieChartColor +
      setPieChartInfoType);
  }
}
