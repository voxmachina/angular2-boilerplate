/*jslint node: true, esversion: 6 */

"use strict";

const gulp = require('gulp');

gulp.task('dev', ['build'], function() {
    gulp.watch(['./app/**/*.scss'], ['compile:sass']);
    gulp.watch(['./app/**/*.ts'], ['compile:typescript']);
    gulp.watch(['./index.html', './app/**/*.html'], ['copy:html:watch']);
});
