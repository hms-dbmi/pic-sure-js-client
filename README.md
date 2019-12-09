# pic-sure-js-client
PIC-SURE Client library written in Javascript



## Dependent Libraries: RequireJS and jQuery3
The PIC-SURE Javascript libraries utilize RequireJS for Asynchronous Module Definition (AMD). At this time, the libraries also use jQuery3's Deferred() system instead of using native JS Promises to implement asychronous functionality for maximum cross-browser compatibility.   

## Build and Test Process: Gulp, Karma & Jasmine
This javascript project uses Gulp as its build tool and Jasmine as its test suite and Karma as the test runner.
Building the library is done via `gulp build` and the output is found in the `dist` folder

Some commands you should know:
- `gulp clean` deletes all files in the `dist` output directory.
- `gulp build` populates the `dist` output directory.
- `gulp test` runs all test specs defined in the `test/tests` directory and ends after printing the test results.
- `gulp tdd` runs all test specs defined in the `test/tests` directory and pauses, reruns tests when files are changed.

## Build/Dev Environment Files
- `gulpfile.js` contains command definitions and code.
- `karma.conf.js` is the karma test runner configuration file.
- `test/test-main.js` is the stub file that loads dependent libraries into the testing environment for each test. 
