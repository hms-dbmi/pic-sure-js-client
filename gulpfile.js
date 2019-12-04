const Server = require('karma').Server;
const { series, parallel } = require('gulp');

/**
 * Run test once and exit
 */
function test(cb) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, cb).start();
}

/**
 * Watch for file changes and re-run tests on each change
 */
function tdd(cb) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, cb).start();
}


function clean(cb) {
    // body omitted
    cb();
}

function jsTranspile(cb) {
    // body omitted
    cb();
}

function jsBundle(cb) {
    // body omitted
    cb();
}

function jsMinify(cb) {
    // body omitted
    cb();
}

function publish(cb) {
    // body omitted
    cb();
}

exports.build = series(
    test,
    clean,
    series(jsTranspile, jsBundle),
    jsMinify,
    publish
);

exports.default = tdd
