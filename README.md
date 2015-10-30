# Gulp tasks

Moudlarized gulp tasks which makes for a cleaner root gulpfile

Inspired by [this Medium post](https://medium.com/@_rywar/spreading-gulp-tasks-into-multiple-files-2f63d8c959d5)

# Expected file structure
These gulp tasks expect the following file structure in order to work properly
```
.
  /src
      /client // Public-facing JS, will be compiled to ./public/js
      /server // Serverside JS, will be compiled to ./dist
      /scss   // Sass files, will be compiled to ./public/css
  /dist // Holds compiled serverside code from ./src/server
  /public // Holds public JS/CSS, compiled from ./src/client and ./src/scss
```
# Tasks

## [`./build`](https://github.com/michigan-com/gulp-tasks/tree/master/build)
Contains tasks that build files (JS, stylesheets, etc)

Modules in this folder can export a function called `watchFunction` which can be run in the watch task.

### [`./build/public-js.js`](https://github.com/michigan-com/gulp-tasks/blob/master/build/public-js.js)
Browserify bundle the public JS found in `../src/js`.

### [`./build/sass.js`](https://github.com/michigan-com/gulp-tasks/blob/master/build/sass.js)
Bundle the sass found in `../src/scss`

### [`./build/server-js.js`](https://github.com/michigan-com/gulp-tasks/blob/master/build/server-js.js)
Run the serverside JS through Babel

## [`./watch`](https://github.com/michigan-com/gulp-tasks/tree/master/watch)
Defines the task `gulp.task('watch')`.Calls the `watchFunction` exported in the modules in `./build`
