"use strict";

const gulp = require('gulp');
const del = require('del');

gulp.task('clean:helpers', function() {
    return del([
        'release/lib/shim.min.js',
        'release/lib/zone.js',
        'release/lib/Reflect.js',
        'release/lib/system.src.js',
        'release/config/systemjs.config.js'
    ]);
});

gulp.task('clean:release', function(cb) {
    return del([
            'release/app/components',
            'release/app/models',
            'release/app/services',
            'release/app/config.js',
            'release/config',
            'release/lib/shim.min.js',
            'release/lib/zone.js',
            'release/lib/Reflect.js',
            'release/lib/system.src.js',
            'release/lib/core.umd.js',
            'release/lib/common.umd.js',
            'release/lib/compiler.umd.js',
            'release/lib/platform-browser.umd.js',
            'release/lib/platform-browser-dynamic.umd.js',
            'release/lib/http.umd.js',
            'release/lib/router.umd.js',
            'release/lib/forms.umd.js',
            'release/lib/rxjs'
        ],
        cb);
});

gulp.task('clean', ['clean:helpers', 'clean:release'], function(cb) {
    del('dist', cb);
    del('build', cb);
    del('release', cb);
});
