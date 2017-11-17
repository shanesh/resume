var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var prefix      = require('gulp-autoprefixer');

// Static server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
/**
 * Compile files from _scss into both _site/css (for live injecting) and site
 */
gulp.task('sass', function () {
    return gulp.src('assets/css/main.scss')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});
/**
 * Watch scss files for changes & recompile
 * Watch html/md files, reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
    // gulp.watch('./**/*.css').on('change', browserSync.reload);
    gulp.watch('./**/*.js').on('change', browserSync.reload);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    browserSync.reload();
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile and launch BrowserSync & watch files.
 */
gulp.task('default', [ 'sass', 'browserSync', 'watch']);
