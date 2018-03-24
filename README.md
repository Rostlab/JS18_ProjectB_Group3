# JS18_ProjectB_Group3

[![Build Status](https://travis-ci.org/Rostlab/JS18_ProjectB_Group3.svg?branch=develop)](https://travis-ci.org/Rostlab/JS18_ProjectB_Group3) [DEMO](https://js2018-group3.azurewebsites.net/)

### File Structure
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
### How to run
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

### Commands
```
# start server
$ npm start

# run unit tests
$ npm run test

# run lint check
$ npm run lint
```