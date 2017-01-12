var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    babelify = require('babelify'),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    browserSync = require('browser-sync');

gulp.task('default', ['less', 'browser-sync']);

gulp.task('less', function () {
    return gulp.src('app/less/**/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch',['browser-sync', 'less'], function () {
   gulp.watch('app/less/**/*.less', ['less']);
   gulp.watch('app/*.html', browserSync.reload);
   gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function() {

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    var buildCss = gulp.src('app/css/style.css')
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildImg = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));
});