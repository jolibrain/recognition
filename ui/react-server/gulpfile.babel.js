import gulp from "gulp";
import babel from "gulp-babel";
import logging from "react-server-gulp-module-tagger";

gulp.task("default", () => {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("build"));
});

gulp.task("watch", () => {
  gulp.watch("src/**/*.js", ['default']);
});
