"use strict";

const gulp = require('gulp');
const inlineNg2Template = require('gulp-inline-ng2-template');

gulp.task('inline', function() {
    return gulp.src(['release/**/*.js', '!release/lib/**/*', '!release/api/**/*'])
        .pipe(inlineNg2Template({
            base: 'release',
            useRelativePaths: true
        }))
        .pipe(gulp.dest('./release'));
});
