"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const exec = require('child_process').exec;
const del = require('del');

gulp.task('aot:sass', function() {
    return gulp
        .src(['app/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('app'));
});

gulp.task('aot:compile', ['aot:sass'], function() {
    exec('./node_modules/.bin/ngc -p tsconfig.aot.json', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

        return !err;
    });
});

gulp.task('aot', ['aot:compile'], function() {
    return del([
        'app/**/*.css',
        'app/**/*.js'
    ]);
});
