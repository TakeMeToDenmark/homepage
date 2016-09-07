var config = require('../config')

var browserSync = require('browser-sync')
var del = require('del')
var frontMatter = require('gulp-front-matter')
var gulp = require('gulp')
var handleErrors = require('../lib/handleErrors')
var markdown = require('gulp-markdown')
var path = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.markdown.src, '/**/**/**/**/*.{' + config.tasks.markdown.extensions + '}'),
  dest: path.join(config.root.src, config.tasks.html.src, config.tasks.markdown.dest)
}

var markdownTask = function (cb) {
  return gulp.src(paths.src)
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }))
    .on('error', handleErrors)
		.pipe(markdown())
    .on('error', handleErrors)
		.pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('markdown', markdownTask)
module.exports = markdownTask
