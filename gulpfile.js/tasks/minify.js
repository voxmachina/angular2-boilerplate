"use strict";

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const pump = require('pump');
const concat = require('gulp-concat');
const htmlMin = require('gulp-html-minifier');
const cleanCSS = require('gulp-clean-css');

gulp.task('minify:concat:helpers', function() {
    return gulp.src([
            'release/lib/shim.min.js',
            'release/lib/zone.js',
            'release/lib/Reflect.js',
            'release/lib/system.src.js',
            'release/config/systemjs.config.js'
        ])
        .pipe(concat({
            path: 'helpers.min.js',
            stat: {
                mode: '0666'
            }
        }))
        .pipe(gulp.dest('release/lib'));
});

gulp.task('minify:helpers', ['minify:concat:helpers'], function(cb) {
    pump([
            gulp.src(['release/lib/helpers.min.js']),
            uglify(),
            gulp.dest('release/lib')
        ],
        cb
    );
});

gulp.task('minify:css', function() {
    return gulp.src(['./release/**/*.css', '!release/lib/**/*', '!release/api/**/*'])
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./release'))
});

gulp.task('minify:html', function() {
    return gulp.src([
            './release/**/*.html',
            '!release/lib/**/*',
            '!release/api/**/*',
            '!release/index.html'
        ])
        .pipe(htmlMin({
            collapseWhitespace: true,
            removeComments: true,
            caseSensitive: true
        }))
        .pipe(gulp.dest('./release'))
});

gulp.task('minify:html:css', ['minify:html', 'minify:css']);

gulp.task('minify', ['minify:helpers', 'minify:html:css'], function(cb) {
    pump([
            gulp.src(['release/**/*.js', '!release/lib/**/*', '!release/api/**/*']),
            babel({
                presets: ['es2015']
            }),
            uglify(),
            gulp.dest('release/')
        ],
        cb
    );
});
