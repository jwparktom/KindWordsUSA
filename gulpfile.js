const
  {watch, src, dest, parallel} = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

function sassBundle(){
  return src('public/lib/style/src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./map'))
    .pipe(dest('public/lib/style/dist/'));
}

function sassWatch(){
  watch('public/lib/style/src/*.scss', sassBundle);
}

function bsInit(){
  browserSync.init({
    proxy: 'http://localhost/website/KindWordsUSA/public/',
    files: [
      'public/**/*.*',
      // '!**/src/*.*', '!**/src/**/*.*',
    ],
    open: false,
  });
}

exports.watch = parallel(bsInit, sassWatch);
