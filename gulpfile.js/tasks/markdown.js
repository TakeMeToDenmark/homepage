var config = require('../config')

var browserSync = require('browser-sync')
var gulp = require('gulp')
var handleErrors = require('../lib/handleErrors')
var markdownContainer = require('markdown-it-container')
// var MarkdownIt = require('markdown-it')
var path = require('path')
var tap = require('gulp-tap')
var util = require('gulp-util')

var paths = {
  src: path.join(config.root.src, config.tasks.markdown.src, '/**/**/**/**/*.{' + config.tasks.markdown.extensions + '}'),
  dest: path.join(config.root.src, config.tasks.html.src, config.tasks.markdown.dest)
}

var md = require('markdown-it')()
md.use(markdownContainer, 'links')
md.use(markdownContainer, 'important')

function markdownToHtml (file) {
  var result = md.render(file.contents.toString())
  file.contents = new Buffer(result)
  file.path = util.replaceExtension(file.path, '.html')
  return
}

var markdownTask = function (cb) {
  return gulp.src(paths.src)
    .pipe(tap(markdownToHtml))
    .on('error', handleErrors)
		.pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('markdown', markdownTask)
module.exports = markdownTask
