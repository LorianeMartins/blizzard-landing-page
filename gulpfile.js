const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function compileSass() {
    return gulp.src('./scss/*.scss')
    .pipe(sass({outputStyle : 'compressed'}))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'], 
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

function gulpJs() {
    return gulp.src('./js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

function pluginsJs() {
    return gulp
    .src(['./js/lib/aos.min.js', './js/lib/swiper.min.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

function pluginsCss() {
    return gulp.src('css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
}

function watch() {
    gulp.watch('scss/*.scss', compileSass);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/scripts/*js', gulpJs);
    gulp.watch('js/lib/*.jss', pluginsJs);
    gulp.watch('js/lib/*.jss', pluginsCss);
}

gulp.task('sass', compileSass);
gulp.task('watch', watch);
gulp.task('browser-sync', browser);
gulp.task('alljs', gulpJs),
gulp.task('pluginsjs', pluginsJs);
gulp.task('pluginscss', pluginsCss);
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'alljs', 'pluginsjs', 'pluginscss')); 
