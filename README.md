# JS18_ProjectB_Group3

[![Build Status](https://travis-ci.org/Rostlab/JS18_ProjectB_Group3.svg?branch=develop)](https://travis-ci.org/Rostlab/JS18_ProjectB_Group3) [DEMO](https://js2018-group3.azurewebsites.net/)

## File Structure

```
├── app/
│   ├── routes.js                   # API Endpoints
│   ├── assets/
│   │   └── scripts/
│   |       └── modules/            # Chart Modifiers
│   |       └── inputProcessing.js  # Module for input processing of the natural language
│   ├── helpers/
│   │   └── chartFactory.js         # Chart Factory Class
├── charts/                         # Chart Classes
├── data/                           # Chart Data Classes
├── lib/
│   ├── index.html                  # App Interface For Third Parties
├── public/
│   ├── index.html                  # Client-side html
│   ├── core.js                     # Client-side Javascript entry
├── test/                           # Unit tests
├── .travis.yaml                    # Travis Configuration File
├── server.js                       # Express Application
├── index.js                        # Module Entry Point
└── package.json                    # NPM Dependencies and Scripts
```

## How to run
 1) install node/npm
 2) run the following commands to run the app
```
$ cd path_to_your_app_directory
# Install NPM dependencies
$ npm install

# Start the app
$ npm start
  -> App listening on port 8080
```
2) visit http://localhost:8080/ in the browser

## Commands
```
# start server
$ npm start

# run unit tests
$ npm run test

# run lint check
$ npm run lint
```

## To Use in Node.js

* add module in your `package.json`
```
"js18_projectb_group3": "https://github.com/Rostlab/JS18_ProjectB_Group3/tarball/develop"`
```
* use in your code
```
var js18_projectb_group3 = require('js18_projectb_group3');

js18_projectb_group3.editChart(inputCommand, chartData, (error, newChartData) => {
    if (error) {
    // handle error
    }
    // do task
});
```

**Please refer to [Plotly API](https://plot.ly/javascript/) for chart data**

## Valid Input Commands
> To match the given input with a regex, user should use the keywords. Only exception is calculating average based on the chart data. It uses a well-defined regex.

* Set chart title (*For all chart types*)

`Keywords: title, "<any value>" (E.g. set title to "Test")`

* Set axis title (*Only for Scatter Plot, Line Chart, Bar Chart, Histogram*)

`Keywords: title, x axis, y axis, x-axis, y-axis, "<any value>" (E.g. change title of x-axis to "X Axis")`

* Set axis range (*Only for Scatter Plot, Line Chart, Bar Chart, Histogram*)

`Keywords: range, x axis, y axis, x-axis, y-axis, <any number interval> (E.g. set range of x-axis to 0,20)`

* Set bar width on a bar chart (*Only for Bar Chart*)

`Keywords: width, bar, <any number> (E.g. set width of bar to 20)`

* Set histogram bin number (*Only for Histogram*)

`Keywords: start, end, size, x axis, y axis, x-axis, y-axis, <any number list>  (E.g. Trace1 set start end size of x-axis to 0,10,0.5)`

* Set width of line on a scatter plot/line chart (*Only for Scatter Plot, Line Chart*)

`Keywords: <data axis name>, width, size, line, <any number> (E.g. Trace1 set width of line to 3)`

* Set color of line on a scatter plot/line chart (*Only for Scatter Plot, Line Chart*)

`Keywords: <data axis name>, color, line, <any color name>(E.g. Trace1 set color of line to red)`

* Set width of marker on a scatter plot/line chart (*Only for Scatter Plot*)

`Keywords: <data axis name>, width, size, marker, <any number> (E.g. Trace1 set width of marker to 3)`

* Set color of marker on a scatter plot/line chart (*Only for Scatter Plot*)

`Keywords: <data axis name>, color, marker, <any color name> (E.g. Trace1 set color of marker to green)`

* Set mode on a scatter plot/line chart (*Only for Scatter Plot*)

`Keywords: <data axis name>, mode, "<any value from the mode list>" (E.g. Trace1 set mode to "markers")`

*Available modes: ["lines", "markers", "lines+markers", "lines+markers+text", "none"]*

* Set dash type on a scatter plot/line chart (*Only for Scatter Plot, Line Chart*)

`Keywords: <data axis name>, dash, "<any value from the dash style list>" (E.g. Trace1 set dash to "dashdot")`

*Available modes: ["solid", "dot", "dash", "longdash", "dashdot", or "longdashdot"]*

* Set opacity of markers on a scatter plot/line chart (*Only for Scatter Plot*)

`Keywords: <data axis name>, opacity, <any number between 0 and 1> (E.g. Trace1 change opacity to 0.8)`

* Set symbol of markers on a scatter plot/line chart (*Only for Scatter Plot*)

`Keywords: <data axis name>, symbol, "<any value from the available symbols>" (E.g. Trace1 change symbol to "star")`

*Symbols [Plotly API](https://plot.ly/javascript/reference/#box-marker-symbol)*

* Set legend size (*For all chart types*)

`Keywords: legend, size, width , <any number> (E.g. change size of legend to 20)`

* Set legend size (*For all chart types*)

`Keywords: legend, position , <any number combination> (E.g. change position of legend to 0,0)`

*There is no limitation for new position however best choice can be any of these number combinations; 0,0 / 1,0 / 0,1 / 1,1*

* Set color of gridlines (*Only for Scatter Plot, Line Chart, Bar Chart, Histogram*)

`Keywords: color, gridlines, x axis, y axis, x-axis, y-axis, <any color name> (E.g. change color of gridlines of x-axis to red)`

* Set width of gridlines (*Only for Scatter Plot, Line Chart, Bar Chart, Histogram*)

`Keywords: width, size, gridlines, x axis, y axis, x-axis, y-axis, <any number> (E.g. set width of gridlines of x-axis to 3)`

* Set colors on a pie chart (*Only for Pie Chart*)

`Keywords: colors, <any color names> (E.g. change colors to red,black,yellow)`

*We use the alphabetic order of color names. The number of colors should be equal to number of datasets. For instance, if there are only 2 labels, then you should enter only 2 color names*

* Set info type on pie chart data (*Only for Pie Chart*)

`Keywords: info, type, <any info type> (E.g. set info type to "value")`

*Info types: Any combination of "label", "text", "value", "percent", "name" joined with a "+" OR "all" or "none" or "skip"*

* Plot average as a bar chart. (*Converting only scatter plot to bar chart)

`plot average <axis name> of <axis name>  (E.g. Trace1 plot average Pay Rate of Gender)`

*This exact pattern should exist in a given command*

## Important Notes

This module can be used as a stand-alone application. To add it as a library into your source code, please follow
[the instructions](#to-use-in-nodejs).

`lib` folder provides an interface to edit Plotly chart objects (they are described declaratively as JSON objects). To make changes on the chart object, `editChart` function should be called (currently doesn't have support for statistical calculations). It takes 3 parameters; an `input` string and a JSON object (Plotly chart object) and a callback function. This callback function can return either an `error` or a `result`. `result` object has 2 properties which are `data` and `layout`.

`app/assets/scripts/inputProcessing.js` contains the main logic for processing the given commands. Supported features are defined in the
[Valid Input Commands](#valid-input-commands) section. Parsing the given commands and matching them with the chart editing actions are done here. These actions are defined in the `app/assets/scripts/modules` folder. There is a rule for each action type (e.g. changing color or setting width of line). Each rule consists of a regular expression to search patterns in a string, an action type and a function to calculate parameters for the corresponding action. Regular expressions try to catch a list of defined strings such as width, line, marker etc... The length of the matched strings is used to pick the proper rule from the list.

First step of processing is converting Plotly chart object into the corresponding chart class. Our module supports `Bar Chart, Scatter Plot, Histogram, Pie Chart and Line Chart`. The defined classes can be found in the `charts/` folder. Creation of instances of these chart classes are delegated to `ChartFactory` class which can be found in the `app/helpers/` folder.

Secondly, for each defined rule a search is executed for a match between a regular expression and a specified string. At every iteration, longest match (each regex execution returns a list of matched strings) is calculated. The action is selected based on this longest match. To calculate the parameters of the selected action, a couple of helper functions are used. We can automatically detect color values, numbers, decimals in a given string. For other types of new values (e.g. title of x-axis), new values should be placed inside quotation marks. It is possible to make changes on a specific dataset on a chart object by specifying the dataset name (e.g. Trace1 set width of bar to 7)

**! If there is no match between a regex and the input string, an error is returned in the callback function**

Lastly, a new state of the chart data is calculated based on the action and the result is returned to client.

The unit tests cover the following parts; input processing, interface, factory class, pie class, scatter class, histogram class and bar class.


#### Roadmap

Currently, for each input string a search is made in a given Plotly chart object to check if the input string includes any dataset name. This creates redundancy in the code. A new way should be developed to detect dataset specific changes.

To set new titles, new modes, new symbols etc... on the chart object, these new values are placed inside quotation marks. This should be totally removed and a new way should be adapted to extract these new values.

Statistical calculations and adding additional data should be implemented as a part of this module.

Setting colors data elements of pie chart should be improved. It assigns color values in a alphabetical order.

Setting bin number in a histogram should be improved. Start, end and size values should be used to calculate the bin number.

Removing randomly half of the data points is missing.

Chart classes support only a set of properties. More options can be added in the class definitions. The rest of the available keys can be found in [Plotly API](https://plot.ly/javascript/)  
