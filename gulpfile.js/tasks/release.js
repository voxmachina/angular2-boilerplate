"use strict";

const gulp = require('gulp');

gulp.task('release', ['aot', 'copy:build'], function() {
    return gulp.src(['app-build/**/*'], {
        dot: true
    }).pipe(gulp.dest('release/app'));
});
