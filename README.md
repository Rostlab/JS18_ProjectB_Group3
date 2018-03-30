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
* Set chart title

`change/set title to <new title> (E.g. set title to Test)`
* Set axis title

`change/set title of x-axis/y-axis to <new title> (E.g. change title of x-axis to X Axis)`
* Set axis range

`change/set range of x-axis/y-axis to <new range> (E.g. set range of x-axis to 0,20)`
* Set bar width on a bar chart

`change/set width of bar to <new width> (E.g. set width of bar to 20)`
* Set histogram bin number

`<data axis name>: change/set start,end,size of x-axis/y-axis to <new start,end,size> (E.g. Trace1: set start,end,size of x-axis to 0,10,0.5)`
* Set width of line on a scatter plot/line chart

`<data axis name>: change/set width/size of line to <new width> (E.g. Trace1: set width of line to 3)`
* Set color of line on a scatter plot/line chart

`<data axis name>: change/set color of line to <new color> (E.g. Trace1: set color of line to red)`
* Set width of marker on a scatter plot/line chart

`<data axis name>: change/set width of marker to <new width> (E.g. Trace1: set width of marker to 3 )`
* Set color of marker on a scatter plot/line chart

`<data axis name>: change/set color of marker to <new color> (E.g. Trace1: set color of marker to green )`
* Set mode on a scatter plot/line chart

`<data axis name>: change/set mode to <new mode> (E.g. Trace1: set mode to markers)`
* Set dash type on a scatter plot/line chart

`<data axis name>: change/set dash to <new dash type> (E.g. Trace1: set dash to dashdot)`
* Set opacity of markers on a scatter plot/line chart

`<data axis name>: change/set opacity to <new opacity> (E.g. Trace1: change opacity to 0.8)`
* Set symbol of markers on a scatter plot/line chart

`<data axis name>: change/set symbol to <new symbol> (E.g. Trace1: change symbol to star)`
* Set legend size

`change/set size of legend to <new size> (E.g. change size of legend to 20)`
* Set legend size

`change/set position of legend to <new position> (E.g. change position of legend to 0,0)`
* Set color of gridlines

`change/set color of gridlines of x-axis/y-axis to <new color> (E.g. change color of gridlines of x-axis to red)`
* Set width of gridlines

`change/set width/size of gridlines of x-axis/y-axis to <new width> (E.g. set width of gridlines of x-axis to 3)`
* Set colors on a pie chart (uses the order of data elements)

`change/set color to <new colors> (E.g. change color to red,black,yellow)`
* Set info type on pie chart data

`change/set info type to <new info type> (E.g. set info type to value)`
