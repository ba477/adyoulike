/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');

gulp.task('clean', function() {
    gulp.src('*')
        .pipe(clean({force: true}));
});
gulp.task('minify-css', function() {
    var opts = {comments:true,spare:true};
    gulp.src(['/**/*.css', '!/bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('/css'))
});
gulp.task('minify-js', function() {
    gulp.src(['/**/*.js', '!/bower_components/**'])
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
        .pipe(gulp.dest('/scripts'))
});
gulp.task('connect', function () {
    connect.server({
        root: 'app/',
        port: 8000
    });
});


// default task
gulp.task('default',
    ['connect', 'watch', 'minify-css', 'minify-js']
);
/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
gulp.task('sass', function(){
    return gulp.src('app/styles/*.scss')
        .pipe(sass())    // ici on utilise gulp-sass
        .pipe(gulp.dest('app/styles/'))
});
gulp.task('watch', function(){
    gulp.watch('app/styles/*.scss', ['sass']);
    // autres observations
});