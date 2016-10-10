"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const exec = require('child_process').exec;
const del = require('del');

gulp.task('aot:copy', function() {
    return gulp.src(['app/**/*'], {
        dot: true
    }).pipe(gulp.dest('app-build/'));
});

gulp.task('aot:sass', ['aot:copy'], function() {
    return gulp
        .src(['app-build/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('app-build'));
});

gulp.task('aot:compile', ['aot:sass'], function(done) {
    exec('./node_modules/.bin/ngc -p tsconfig.aot.json', function(err, stdout, stderr) {
        done();
    });
});

gulp.task('aot:replace', function() {
    return gulp.src(['app-build/**/*'], {
        dot: true
    }).pipe(gulp.dest('release/app'));
});

gulp.task('aot', ['aot:compile'], function() {
    // return gulp.src(['app-build/**/*'], {
    //     dot: true
    // }).pipe(gulp.dest('release/app'));
});
