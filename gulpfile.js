const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

gulp.task('workflow', () => {
  gulp
    .src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(gulp.dest('./dist/css/')) // unminified
    .pipe(
      cssnano({
        zindex: false,
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(
      rename(function(path) {
        if (path.extname === '.css') {
          path.basename += '.min';
        }
      })
    )
    .pipe(gulp.dest('./dist/css/'));
});

// Watch task
gulp.task('default', () => {
  gulp.watch('./src/scss/**/*.scss', ['workflow']);
});
