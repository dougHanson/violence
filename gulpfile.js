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
const  htmlmin = require('gulp-htmlmin');
const  replace = require('gulp-string-replace');
const  clean = require('gulp-clean');


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


// Make CSS path production ready (.min)
gulp.task('replace', function() {
  return gulp.src(["./index.html"])
    .pipe(replace('styles.css', 'styles.min.css'))
    .pipe(gulp.dest('./dist'))
});


// Minify HTML
gulp.task('minify-html', gulp.series('replace', function() {
//gulp.task('minify-html', function() {
  return gulp.src('./dist/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./dist/'));
}));


// Copy images and favicon
gulp.task('copy', function () {
  return gulp.src(['favicon.ico', 'images/**'],  {base: './'})
    .pipe(gulp.dest('./dist'));
});


// Compress new images
gulp.task('compress-images', gulp.series('copy', function() {
  return gulp.src('./dist/images/**/*')
    //.pipe(changed('./images'))
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
}));


// Watch Files For Changes
gulp.task('watch', gulp.series('compile-sass', function() {
  gulp.watch(['js/**/*.js', '!js/plugins/**/*.js'], gulp.series('lint-js', 'minify-js'));
  gulp.watch('css/**/*.scss', gulp.series('minify-css'));
}));


gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});

// Default Tasks
gulp.task('default', gulp.series('watch'));
gulp.task('publish', gulp.series('clean', 'minify-css', 'minify-js', 'compress-images', 'minify-html'));
