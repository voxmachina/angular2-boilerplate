"use strict";

const gulp = require('gulp');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const htmlReplace = require('gulp-html-replace');
const sass = require('gulp-sass');
const htmlMin = require('gulp-html-minifier');
const GulpSSH = require('gulp-ssh');
const config = require('./../../config/gulp.json');
const rename = require('gulp-rename');

let currentDateTimeStamp = new Date().getTime();

let gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config.ssh
});

gulp.task('symlink:index', function() {
    gulp.src('release/index.html')
        .pipe(htmlReplace({
            'js': {
                src: [['lib/helpers.min.'+currentDateTimeStamp+'.js']],
                tpl: '<script>var currentDateTimeStamp = '+currentDateTimeStamp+';</script><script src="%s" async></script>'
            },
            'analytics': {
                src: [['/api/www/services/content/public/analytics.'+currentDateTimeStamp+'.js']],
                tpl: '<script src="%s" async defer></script>'
            },
            'css': {
                src: [['/app/main.'+currentDateTimeStamp+'.css']],
                tpl: '<link rel="stylesheet" type="text/css" href="%s"/>'
            },
            'criticalCss': {
                src: gulp.src('./config/critical.scss').pipe(sass()),
                tpl: '<style>%s</style>'
            },
            'criticalHtml': {
                src: gulp.src('./config/critical.html').pipe(htmlMin()),
                tpl: '<?php $rootDir = "'+config.rootDir+'"; ?>%s'
            }
        }))
        .pipe(gulp.dest('release/'));
});

gulp.task('symlink:helpers', ['symlink:index'], function() {
    return gulp.src(["./release/app/*.css", "./release/app/*.js", "./release/lib/*.js"])
      .pipe(rename(function (path) {
          if (path.basename === 'helpers.min') {
              path.dirname = 'lib'
          } else {
              path.dirname = 'app'
          }
        path.basename += "." + currentDateTimeStamp;
        return path;
    })).pipe(gulp.dest("./release/"));
});

gulp.task('symlink:prepare', ['symlink:helpers'], function() {
    let rootDir = config.rootDir;

    return gulp.src(['release/**/*'], {
            dot: true
        })
        .pipe(tar('release-' + currentDateTimeStamp + '.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('dist'))
        .pipe(gulpSSH.sftp('write', rootDir + 'release-' + currentDateTimeStamp + '.tar.gz'));
});

gulp.task('symlink', ['symlink:prepare'], function() {
    let rootDir = config.rootDir;

    return gulpSSH
        .exec([
            'mkdir ' + rootDir + currentDateTimeStamp,
            'tar -xvf ' + rootDir + 'release-' + currentDateTimeStamp + '.tar.gz -C ' + rootDir + currentDateTimeStamp,
            'rm -rf ' + rootDir + 'release-' + currentDateTimeStamp + '.tar.gz',
            'rm -rf ' + rootDir + 'current',
            'ln -s ' + rootDir + currentDateTimeStamp + ' ' + rootDir + 'current',
            'mv ' + rootDir + currentDateTimeStamp + '/index.html ' + rootDir + currentDateTimeStamp + '/api/www/services/content/resources/views/index.php',
            'ln -s ' + rootDir + currentDateTimeStamp + '/api/www/services/content/resources/views/index.php ' + rootDir + currentDateTimeStamp + '/index.php'
        ]);
});
