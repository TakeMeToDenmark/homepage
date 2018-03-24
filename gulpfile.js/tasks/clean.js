var config = require('../config')

var gulp = require('gulp')
var del = require('del')
var path = require('path')

var markdownFiles = path.join(config.root.src, config.tasks.html.src, config.tasks.markdown.dest)

var cleanTask = function (cb) {
  del([config.root.dest, markdownFiles]).then(function (paths) {
    cb()
  })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask
