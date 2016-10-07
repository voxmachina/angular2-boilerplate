"use strict";

const gulp = require('gulp');
const rollup = require('rollup').rollup;
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

gulp.task('bundle', function() {
    return rollup({
        entry: 'release/app/main.js',
        plugins: [
            nodeResolve({
                jsnext: true
            }),
            commonjs()
        ]
    }).then(function(bundle) {
        return bundle.write({
            format: 'iife',
            moduleName: 'IGenius',
            dest: 'release/app/main.js'
        });
    });
});
