'use strict';

var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('compress', function() {
    gulp.src('ajax-navi.js')
        .pipe(minify())
        .pipe(gulp.dest('./'))
});
