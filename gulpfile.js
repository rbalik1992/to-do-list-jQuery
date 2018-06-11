/**
 * @file
 * Defines gulp tasks to be run by Gulp task runner.
 */
/* eslint-env node */
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  notify = require("gulp-notify") ,
  prefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  cssmin = require('gulp-clean-css'),
  browserSync = require('browser-sync');
// Init Gulp
gulp.task('init', function() {
  'use strict';
  gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceMap: true,
      errLogToConsole: true
    }).on('error', function(err) {
      notify().write(err);
      //this.emit('end');
    }))
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({stream:true}));
});
// Watch task //
gulp.task('watch',['init','browser-sync','sass'], function() {
  'use strict';
  gulp.watch('sass/**/*.scss', ['init']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});
// Compile sass into CSS & auto-inject into browsers //
gulp.task('sass', function() {
  'use strict';
  return gulp.src("sass/*.scss").pipe(sass()).pipe(gulp.dest("css"))
});
// browser sync //
gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './',
    },
    notify: false
  });
});