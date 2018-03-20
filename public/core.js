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

  var setTitle = '\n - change/set title to <new title>';
  var setAxisTitle = '\n - change/set title of x-axis/y-axis to <new title>';
  var setAxisRange = '\n - change/set range of x-axis/y-axis to <new range> (e.g. 0,20)';
  var setBarWidth = '\n  - change/set width of bar to <new width> (currently just for Bar Chart)';
  var setHistogramBinNumber = '\n - Trace1: change/set start,end,size of x to <new number> (e.g. 0,20,0.5) (currently just for Histogram, setting bin number)';
  var setScatterLineThick = '\n - Trace1: change/set width/size of line to <new width> (currently just for Scatter Plot)';
  var setScatterLineColor = '\n - Trace1: change/set color of line to <new color> (currently just for Scatter Plot)';
  var setScatterMarkerThick = '\n - Trace1: change/set width/size of dot to <new width> (currently just for Scatter Plot)';
  var setScatterMarkerColor = '\n - Trace1: change/set color of dot to <new color> (currently just for Scatter Plot)';
  var setScatterConnectionLines = '\n - Trace1: change/set mode to <new mode> (currently just for Scatter Plot)';
  var setScatterDashType = '\n - Trace1: change/set dash to <new type> (currently just for Scatter Plot)';
  var setScatterMarkerOpacity = '\n - Trace1: change/set opacity to <new opacity> (currently just for Scatter Plot)';
  var setScatterMarkerSymbol = '\n - Trace1: change/set symbol to <new symbol> (currently just for Scatter Plot)';
  var setLegendSize = '\n - change/set size of legend to <new size> (e.g. 20)';
  var setLegendPosition = '\n - change/set position of legend to <new position> (e.g. 0,0)';
  var setGridlinesColor = '\n - change/set color of gridlines of x-axis/y-axis to <new color>';
  var setGridlinesSize = '\n - change/set width/size of gridlines of x-axis/y-axis to <new width>';
  var setPieChartColor = '\n - change/set color to <new colors> (e.g. red,black,yellow)';
  var setPieChartInfoType = '\n - change/set info type to <new type> (e.g. value)';


  function inputAlert() {
    alert("Wrong input! \n\nvalid inputs are: " +
      setTitle +
      setAxisTitle +
      setAxisRange +
      setBarWidth +
      setHistogramBinNumber +
      setScatterLineThick +
      setScatterLineColor +
      setScatterMarkerThick +
      setScatterMarkerColor +
      setScatterConnectionLines +
      setScatterDashType +
      setScatterMarkerOpacity +
      setScatterMarkerSymbol +
      setLegendSize +
      setLegendPosition +
      setGridlinesColor +
      setGridlinesSize +
      setPieChartColor +
      setPieChartInfoType);
  }
}
