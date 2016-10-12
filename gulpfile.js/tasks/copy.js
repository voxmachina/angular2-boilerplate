/*jslint node: true, esversion: 6 */

"use strict";

const gulp = require('gulp');
const config = require('./../../config/gulp.json');

gulp.task('copy:htaccess:main', function() {
    return gulp.src('./app/.htaccess').pipe(gulp.dest('./release/app'));
});

gulp.task('copy:htaccess:lib', function() {
    return gulp.src('./app/.htaccess').pipe(gulp.dest('./release/lib'));
});

/**
 * app htaccess file
 */
gulp.task('copy:htaccess', ['copy:htaccess:main', 'copy:htaccess:lib']);

/**
 * Copy scripts to build/lib directory
 */
gulp.task('copy:scripts', function() {
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
gulp.task('copy:rxjs', function() {
    return gulp.src('node_modules/rxjs/**/*').pipe(gulp.dest('build/lib/rxjs'));
});

/**
 * Copy html files to build directory in watch mode
 */
gulp.task('copy:html:watch', function() {
    return gulp.src([
        './**/*.html',
        './index.html',
        '!api/**/*',
        '!build/**/*',
        '!node_modules/**/*'
    ]).pipe(gulp.dest('build'));
});

/**
 * Copy html files to build directory
 */
gulp.task('copy:html', function() {
    return gulp.src([
        './**/*.html',
        '!./build/**/*',
        '!./node_modules/**/*',
        '!./api/**/*',
        '.htaccess',
        config.googleKey + '.html'
    ]).pipe(gulp.dest('build'));
});

/**
 * Copy API files to build directory
 */
gulp.task('copy:api', function() {
    return gulp.src(['api/**/*', '!api/Dockerfile', '!api/start', '!api/apache-config.conf'], {
            dot: true
        })
        .pipe(gulp.dest('build/api'));
});

/**
 * Copy configurations
 */
gulp.task('copy:config', function() {
    return gulp.src('config/systemjs.config.js').pipe(gulp.dest('build/config'));
});

/**
 * Copy app icons
 */
gulp.task('copy:icons', function() {
    return gulp.src(['app-icons/**/*', '!build/app-icons/**/*'], {
            dot: true
        })
        .pipe(gulp.dest('build/app-icons'));
});

/**
 * Copy favicon
 */
gulp.task('copy:favicon', function() {
    return gulp.src(['favicon.ico', '!build/favicon.icon'], {
            dot: true
        })
        .pipe(gulp.dest('build'));
});

/**
 * Copy web config files
 */
gulp.task('copy:webconfig', function() {
    return gulp.src(['browserconfig.xml', 'manifest.json'], {
            dot: true
        })
        .pipe(gulp.dest('build'));
});

/**
 * Copies a build to a relase
 */
gulp.task('copy:build', function() {
    return gulp.src(['build/**/*'], {
        dot: true
    }).pipe(gulp.dest('release/'));
});

gulp.task('copy', [
    'copy:htaccess',
    'copy:scripts',
    'copy:html',
    'copy:config',
    'copy:rxjs',
    'copy:api',
    'copy:icons',
    'copy:favicon',
    'copy:webconfig'
]);
