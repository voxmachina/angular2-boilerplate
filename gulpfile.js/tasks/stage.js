"use strict";

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('stage', ['clean'], function() {
    return runSequence(
        'build',
        'release',
        'inline',
        'bundle',
        'minify',
        'symlink:clean'
    );
});
