const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function () {
  return gulp
    .src('page/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('page/css'));
});

gulp.task('watch', function () {
  gulp.watch('page/scss/**/*.scss', gulp.series(['sass']));
});
