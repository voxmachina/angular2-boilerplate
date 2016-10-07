"use strict";

const gulp = require('gulp');

gulp.task('dev', ['build'], function() {
    gulp.watch(['./app/**/*.scss'], ['sass']);
    gulp.watch(['./app/**/*.ts'], ['compile-typescript']);
    gulp.watch(['./index.html', './app/**/*.html'], ['copy-html']);
});
