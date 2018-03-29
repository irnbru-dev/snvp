'use strict';

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    prettify = require('gulp-prettify'),
    uglifycss = require('gulp-uglifycss'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({browsers: ["last 2 versions", '> 5%', 'ie >= 10']});

var path = {
    dest: {
        js:         'build/js/',
        css:        'build/css/',
        html:       'build/'
    },
    src: {
        css:        'src/css/',
        cssDev:     'src/css/styles.css',
        js:         'src/js/**/*.js',
        lessMain:   'src/less/style.less',
        html:       'src/pug/pages/**/*.pug'
    },
    watch: {
        js:         'src/js/**/*.js',
        less:       ['src/less/**/*.less', 'src/blocks/**/*.less'],
        pug:        ['src/pug/**/*.pug', 'src/blocks/**/*.pug']
    }
};

gulp.task('pug', function() {
    return gulp.src(path.src.html)
        .pipe(pug())
        .pipe(prettify({
            indent_size: 2
        }))
        .pipe(gulp.dest(path.dest.html))
});

gulp.task('js', function() {
    return gulp.src(path.src.js)
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dest.js))
});

gulp.task('less', function () {
    return gulp.src(path.src.lessMain)
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(path.src.css))
});

gulp.task('css', ['less'], function () {
    return gulp.src(path.src.cssDev)
        .pipe(concat('style.css'))
        .pipe(uglifycss({
            "maxLineLen": 500,
            "uglyComments": true
        }))
        .pipe(gulp.dest(path.dest.css))
});

gulp.task('watch', function() {
    gulp.watch(path.watch.less, ['css']);
    gulp.watch(path.watch.js, ['js']);
    gulp.watch(path.watch.pug, ['pug']);
});

gulp.task('default', ['watch']);

//test