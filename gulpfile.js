'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();
    // minifyCss = require('gulp-minify-css'),
    // rename = require('gulp-rename');

gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: './assets'
    });

    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/**/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('./assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
});