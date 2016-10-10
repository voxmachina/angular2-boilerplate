"use strict";

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('deploy', function() {
    runSequence(
        'build',
        'release',
        'inline',
        'bundle',
        'minify',
        'symlink',
        'clean'
    );
});
