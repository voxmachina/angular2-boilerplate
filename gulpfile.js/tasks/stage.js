"use strict";

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('stage', function() {
    return runSequence(
        'build',
        'release',
        'inline',
        'bundle',
        'minify'
    );
});
