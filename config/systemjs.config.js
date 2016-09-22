/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'lib:': 'lib/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: '../app',
      '@angular/core': 'lib:core.umd.js',
      '@angular/common': 'lib:common.umd.js',
      '@angular/compiler': 'lib:compiler.umd.js',
      '@angular/platform-browser': 'lib:platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'lib:platform-browser-dynamic.umd.js',
      '@angular/http': 'lib:http.umd.js',
      '@angular/router': 'lib:router.umd.js',
      '@angular/forms': 'lib:forms.umd.js',
      'rxjs': 'lib:rxjs'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
