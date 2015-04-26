var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

var rebaseUrls = require('gulp-css-rebase-urls');

// Postcss
var postcss = require('gulp-postcss');
var cssnext = require('gulp-cssnext');
var atImport = require('postcss-import');
var nested = require('postcss-nested');
var customProperties = require("postcss-custom-properties")

// Constants
var STATIC = {
  root: './static/',
  srcRoot: './static/src',
  distRoot: './static/dist',
}

var cssRoot = STATIC.srcRoot + '/css';
var cssDist = STATIC.distRoot + '/css';
var cssFiles = cssRoot + '/**/*.css';

gulp.task('css', function() {

  var processors = [
    // atImport
    nested(),
    customProperties({
      variables: {
        primaryColor: '#3D4970',
        secondaryColor: '#CBC07E',
      }
    })
  ];

  gulp.src(cssFiles)
        .pipe(rebaseUrls())
        // .pipe(postcss([processors]))
        .pipe(cssnext({
          // compress: true,
          sourcemap: true,
        }))
        .pipe(gulp.dest(cssDist));

  return;
});

gulp.task('watch', function() {

  watch(cssFiles, batch(function() {
    gulp.start('css')
      .pipe(watch(cssFiles));
  }));
});