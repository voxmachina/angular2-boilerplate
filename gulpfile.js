"use strict";

const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const pump = require('pump');
const tsProject = ts.createProject('tsconfig.json');

/**
 * Copy scripts to build/lib directory
 */
gulp.task('copy-scripts', function() {
  let scripts = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/@angular/core/bundles/core.umd.js',
    'node_modules/@angular/common/bundles/common.umd.js',
    'node_modules/@angular/compiler/bundles/compiler.umd.js',
    'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    'node_modules/@angular/http/bundles/http.umd.js',
    'node_modules/@angular/router/bundles/router.umd.js',
    'node_modules/@angular/forms/bundles/forms.umd.js'
  ];

  return gulp.src(scripts).pipe(gulp.dest('build/lib'));
});

/**
 * Copy RXJS lib to build folder
 */
gulp.task('copy-rxjs', function() {
  return gulp.src('node_modules/rxjs/**/*').pipe(gulp.dest('build/lib/rxjs'));
});

/**
 * Copy html files to build directory
 */
gulp.task('copy-html', function() {
  return gulp.src(['./**/*.html', '!node_modules/**/*']).pipe(gulp.dest('build'));
});

/**
 * Copy configurations
 */
gulp.task('copy-config', function() {
  return gulp.src('config/systemjs.config.js').pipe(gulp.dest('build/config'));
});

/**
 * Copies a build to a relase
 */
gulp.task('copy-build', function() {
  return gulp.src('build/**/*').pipe(gulp.dest('release/'));
});

/**
 * Cleans build folder
 */
gulp.task('clean', function (cb) {
  del('build', cb);
  del('release', cb);
});

/**
 * Compiles TypeScript files into Javascript
 * Also adds sourcemaps
 */
gulp.task('compile-typescript', function() {
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
gulp.task('sass', function () {
  return gulp
    .src(['./**/*.scss', '!node_modules/**/*'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write("maps"))
    .pipe(gulp.dest('build'));
});

/**
 * Compress js files for release
 */
gulp.task('uglify', function (cb) {
  pump([
        gulp.src(['release/**/*.js', '!release/lib/**/*']),
        uglify(),
        gulp.dest('release/')
    ],
    cb
  );
});

gulp.task('default', ['compile-typescript']);
gulp.task('copy', ['copy-scripts', 'copy-html', 'copy-config', 'copy-rxjs']);
gulp.task('build', ['compile-typescript', 'copy', 'sass']);
gulp.task('prepare-release', ['copy-build']);
gulp.task('compile-release', ['uglify']);
