var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var _ = require('lodash');
var fs = require('fs');
var file = require('file');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

var watch = require('gulp-watch');
var batch = require('gulp-batch');
var rebaseUrls = require('gulp-css-rebase-urls');

// Postcss
var postcss = require('gulp-postcss');

// Constants
var STATIC = {
  root: './static/',
  srcRoot: './static/src',
  distRoot: './static/dist',
}

// CSS File paths
var cssRoot = STATIC.srcRoot + '/css';
var cssDist = STATIC.distRoot + '/css';
var cssFiles = cssRoot + '/**/*.css';

// JS File paths
var jsRoot = STATIC.srcRoot + '/js';
var jsDist = STATIC.distRoot + '/js';
var jsFiles = jsRoot + '/**/*.js';
var jsSrcFiles = ['migreva.js'];

gulp.task('css', function() {

  var processors = [
    require('postcss-nested'),
    require('postcss-url'),
    require('postcss-import')({
    }),
    require('postcss-simple-vars')({
      variables: {
        // primary
        primaryColor: '#3D4970',
        primaryColorDarken: '#8B7E31',

        // secondary
        secondaryColor: '#CBC07E'
      }
    }),
    require("postcss-color-function"),
    // require('postcss-assets')({
      // loadPaths: ['./static/src/css/lib/fonts/raleway/fontFiles/']
    // })
  ];

  return gulp.src(cssFiles)
          // .pipe(sourcemaps.init())
          .pipe(postcss(processors, {
            map: {
              inline: true
            }
          }))
          // .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest(cssDist));
});

gulp.task('js', function() {
  _.forEach(jsSrcFiles, function(file) {
    bundlejs(file);
  });
  return;
});

function bundlejs(file) {
  var b = browserify(jsRoot + '/' + file, {
    shim: {
      jQuery: {
          path: 'public/js/jquery.min.js',
          exports: '$'
      }
    }
  });

  return b.bundle()
          .pipe(source(file))
          .pipe(buffer())
          .pipe(sourcemaps.init())
            // .pipe(uglify())
            // .on('error', gutil.log)
          .pipe(sourcemaps.write('./', {
            // includeContent: true,
            sourceRoot: '/src',
            sourceMappingURLPrefix: '/dist/js/'

          }))
          .pipe(gulp.dest(jsDist));
}

gulp.task('watch', function() {

  watch(cssFiles, batch(function() {
    gulp.start('css')
      .pipe(watch(cssFiles));
  }));

  watch(jsFiles, batch(function() {
    gulp.start('js')
      .pipe(watch(jsFiles));
  }));
});

gulp.task('dev', function() {
  gulp.start('js')
      .start('css');
})