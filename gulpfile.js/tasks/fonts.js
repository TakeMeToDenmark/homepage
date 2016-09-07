var config = require('../config')

var browserSync = require('browser-sync')
var gulp = require('gulp')
var handleErrors = require('../lib/handleErrors')
var path = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.fonts.src,'/**/*'),
  dest: path.join(config.root.dest, config.tasks.fonts.dest)
}

var fontsTask = function () {
  return gulp.src(paths.src)
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('fonts', fontsTask)
module.exports = fontsTask
