"use strict";

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');

gulp.task('compile:typescript', function() {
    let tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write("maps"))
        .pipe(gulp.dest("build"));
});

/**
 * Compile sass files into css into the build folder
 */
gulp.task('compile:sass', function() {
    return gulp
        .src(['./**/*.scss', '!build/**/*.scss', '!node_modules/**/*'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write("maps"))
        .pipe(gulp.dest('build'));
});

gulp.task('compile', ['compile:sass', 'compile:typescript']);
