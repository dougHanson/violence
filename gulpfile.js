// Include gulp
const  gulp = require('gulp'); 

// Include plugins
const  jshint = require('gulp-jshint');
const  sass = require('gulp-sass');
const  autoprefix = require('gulp-autoprefixer');
const  minifyCSS = require('gulp-minify-css');
const  concat = require('gulp-concat');
const  uglify = require('gulp-uglify');
const  rename = require('gulp-rename');
const  changed = require('gulp-changed');
const  imagemin = require('gulp-imagemin');


// JS lint task [jsHint]
gulp.task('lint-js', function() {
  return gulp.src(['./js/**/*.js', '!js/plugins/**/*.js']) //exclude plugins
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// Compile Sass
gulp.task('compile-sass', function() {
  return gulp.src('./css/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))         // compile sass to working folder
    .pipe(gulp.dest('./dist/css'));  // compile sass to dist folder
});


// Minify CSS (concatenate, auto-prefix and minify)
gulp.task('minify-css', gulp.series('compile-sass', function() {
  return gulp.src(['./dist/css/**/*.css'])
    .pipe(concat('styles.min.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest('./dist/css'));
}));


// Minify JS (concatenate and minify)
gulp.task('minify-js', function() {
  return gulp.src('./js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});


// Compress new images
gulp.task('compress-images', function() {
  return gulp.src('./images/**/*')
    .pipe(changed('./imgages'))
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
});


// Watch Files For Changes
gulp.task('watch', gulp.series('compile-sass', function() {
  gulp.watch(['js/**/*.js', '!js/plugins/**/*.js'], gulp.series('lint-js', 'minify-js'));
  gulp.watch('css/**/*.scss', gulp.series('minify-css'));
}));


// Default Task
gulp.task('default', gulp.series('watch'));
gulp.task('publish', gulp.series('minify-css', 'minify-js', 'compress-images'));
