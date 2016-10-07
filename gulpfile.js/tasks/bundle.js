"use strict";

const gulp = require('gulp');
const rollup = require('rollup').rollup;
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify   = require('rollup-plugin-uglify');
const babel = require('rollup-plugin-babel');

gulp.task('bundle', function() {
    return rollup({
        entry: 'release/app/main.js',
        plugins: [
            nodeResolve({
                jsnext: true
            }),
            commonjs(),
            babel({
                presets: ['es2015-rollup']
            }),
            uglify()
        ]
    }).then(function(bundle) {
        return bundle.write({
            format: 'iife',
            moduleName: 'IGenius',
            dest: 'release/app/main.js'
        });
    });
});
