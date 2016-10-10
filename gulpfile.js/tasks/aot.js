"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const exec = require('child_process').exec;
const del = require('del');
const replace = require('gulp-replace');

gulp.task('aot:copy', function() {
    return gulp.src(['app/**/*'], {
        dot: true
    }).pipe(gulp.dest('app-build/'));
});

gulp.task('aot:transform:clean', ['aot:copy'], function() {
    return gulp.src(['app-build/**/*.js', 'app-build/**/*.ts'])
        .pipe(replace(
            'moduleId: module.id,',
            ''
        ))
        .pipe(gulp.dest('app-build'));
});

gulp.task('aot:transform', ['aot:transform:clean'], function() {
    return gulp.src(['app-build/main.js', 'app-build/main.ts'])
        .pipe(replace(
            'import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"',
            'import { platformBrowser } from "@angular/platform-browser"'
        ))
        .pipe(replace(
            'import { AppModule } from "./components/app/app.module"',
            'import { AppModuleNgFactory } from "./components/app/app.module.ngfactory"'
        ))
        .pipe(replace(
            'var platform = platformBrowserDynamic();',
            ''
        ))
        .pipe(replace(
            'const platform = platformBrowserDynamic();',
            ''
        ))
        .pipe(replace(
            'platform.bootstrapModule(AppModule)',
            'platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)'
        ))
        .pipe(replace(
            '// <enableProdMode>',
            'enableProdMode();'
        ))
        .pipe(gulp.dest('app-build'));
});

gulp.task('aot:sass', ['aot:transform'], function() {
    return gulp
        .src(['app-build/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('app-build'));
});

gulp.task('aot:compile', ['aot:sass'], function(done) {
    exec('./node_modules/.bin/ngc -p tsconfig.aot.json', function(err, stdout, stderr) {
        done();
    });
});

gulp.task('aot:replace', function() {
    return gulp.src(['app-build/**/*'], {
        dot: true
    }).pipe(gulp.dest('release/app'));
});

gulp.task('aot', ['aot:compile']);
