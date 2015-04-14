var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var pkg = require('./package');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var PATHS = {
    src: {
        root: 'src',
        js: 'src/**/*.js',
        html: 'src/**/*.html',
        css: 'node_modules/angular-material/angular-material.css'
    },
    lib: [
        'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',
        'node_modules/systemjs/lib/extension-register.js',
        'node_modules/angular2/node_modules/zone.js/zone.js',
        'node_modules/angular2/node_modules/zone.js/long-stack-trace-zone.js',
        'node_modules/angular-material/angular-material.js'
    ]
};

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('js', function () {
    return gulp.src(PATHS.src.js)
        .pipe($.rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.traceur({
            sourceMaps: true,
            modules: 'instantiate',
            moduleName: true,
            annotations: true,
            types: true,
            memberVariables: true
        }))
        .pipe($.rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe($.sourcemaps.write('.', {sourceRoot: PATHS.src.root}))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html)
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    return gulp.src(PATHS.src.css)
        .pipe($.size({showFiles: true, gzip: true}))
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('libs', ['angular2'], function () {
    return gulp.src(PATHS.lib)
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('angular2', function () {

  var buildConfig = {
    paths: {
      "angular2/*": "node_modules/angular2/es6/prod/*.es6",
      "rx/*": "node_modules/angular2/node_modules/rx/*.js"
    }
  };

  var Builder = require('systemjs-builder');
  var builder = new Builder(buildConfig);

  return builder.build('angular2/angular2', 'dist/lib/angular2.js', {});
});

gulp.task('default', ['js', 'html', 'css', 'libs'], function() {
  browserSync({
    notify: false,
    logPrefix: pkg.name,
    server: ['dist']
  });

  gulp.watch(PATHS.src.html, reload);
  gulp.watch(PATHS.src.js, reload);
});
