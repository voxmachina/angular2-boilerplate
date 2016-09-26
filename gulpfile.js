"use strict";

const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const pump = require('pump');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const GulpSSH = require('gulp-ssh');
const fs = require('fs');
const runSequence = require('run-sequence');
const tsProject = ts.createProject('tsconfig.json');
const config = require('./config/gulp.json');

let currentDateTimeStamp = new Date().getTime();

let gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config.ssh
});

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
 * Copy API files to build directory
 */
gulp.task('copy-api', function() {
  return gulp.src(['api/**/*', '!api/Dockerfile', '!api/start', '!api/apache-config.conf'], {dot:true})
    .pipe(gulp.dest('build/api'));
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
  return gulp.src(['build/**/*'], {dot:true}).pipe(gulp.dest('release/'));
});

/**
 * Cleans build folder
 */
gulp.task('clean', function (cb) {
  del('dist', cb);
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

/**
 * Aux tasks
 */
gulp.task('default', ['compile-typescript']);

/**
 * Deploy tasks
 */
gulp.task('copy', ['copy-scripts', 'copy-html', 'copy-config', 'copy-rxjs', 'copy-api']);
gulp.task('build', ['compile-typescript', 'copy', 'sass']);
gulp.task('release', ['copy-build']);
gulp.task('compress', ['uglify'], function() {
    return gulp.src(['release/**/*'], {dot:true})
        .pipe(tar('release-'+currentDateTimeStamp+'.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('dist'))
        .pipe(gulpSSH.sftp('write', '/home/dh_voxmachina/igenius_releases/release-'+currentDateTimeStamp+'.tar.gz'));
});

gulp.task('symlink', ['compress'], function() {
  let rootDir = '/home/dh_voxmachina/igenius_releases/';

  return gulpSSH
    .exec([
      'mkdir '+rootDir+currentDateTimeStamp,
      'tar -xvf '+rootDir+'release-' + currentDateTimeStamp + '.tar.gz -C '+rootDir+currentDateTimeStamp,
      'rm -rf '+rootDir+'release-' + currentDateTimeStamp + '.tar.gz',
      'rm -rf '+rootDir+'current',
      'ln -s '+rootDir+currentDateTimeStamp+' '+rootDir+'current'
    ]);
});

gulp.task('deploy', function(done) {
  runSequence('build', 'release', 'compress', 'symlink', 'clean');
  done();
});
