//////////////////////////
// MODULES & VARIABLES //
////////////////////////

// Generic
var browserSync = require('browser-sync');
var requireDir = require('require-dir');
var cp = require('child_process');

// Gulp
var gulp = require('gulp');
var cmq = require('gulp-combine-media-queries');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
var order = require('gulp-order');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var watch = require('gulp-watch');

// Other variables
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Paths
var path = {

    publicDir: './_site',

    assetsDir: './_site/assets',

    sassSrc: './_scss/**/**/**/*.scss',
    sassDir: './_site/assets/css',
    sassDir2: './assets/css',

    jsSrc: './_js/**/**/**.js',
    jsDir: './_site/assets/js',

    jekyllWatch: ['./study/**/**/*.{html,md}', './housing/**/**/*.{html,md}', '_layouts/**/*.html', '_posts/**/*']

};


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build', '--config', '_config.yml,_config_dev.yml'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: path.publicDir
        },
        // proxy: 'tmtd.dev'
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src(path.sassSrc)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(sourcemaps.write())
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
        .pipe(cmq())
        .pipe(minifyCSS({keepSpecialComments: '0'}))
        .pipe(gulp.dest(path.sassDir))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest(path.sassDir2));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    watch(path.sassSrc, function() { gulp.start('sass'); });
    watch(path.jekyllWatch, function() { gulp.start('jekyll-rebuild'); });
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
