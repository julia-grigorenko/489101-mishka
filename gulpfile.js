var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber      = require('gulp-plumber'),
    postcss      = require('gulp-postcss'),
    minify       = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    imagemin     = require("imagemin"),
    webp         = require("cwebp"),
    svgstore     = require("gulp-svgstore"),
    posthtml     = require("gulp-posthtml"),
    include      = require("posthtml-include"),
    run          = require('run-sequence'),
    del          = require("del"),
    minifyJs   = require('gulp-uglify'),
    server = require("browser-sync").create();

gulp.task("copy", function () {
 return gulp.src([
   "source/fonts/**/*.{woff,woff2}",
   "source/img/**"
   ], {
     base: "source"
   })
   .pipe(gulp.dest("build"));
});

gulp.task("copyJs", function () {
 return gulp.src("source/js/*.js")
   .pipe(minifyJs())
   .pipe(rename({suffix: '.min'}))
   .pipe(gulp.dest("build/js"));
});

gulp.task("copyCss", function () {
  gulp.src('source/css/*.css')
    .pipe(plumber())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(gulp.dest("build/css"));
});

gulp.task("clean", function () {
 return del("build");
});

gulp.task('style-build', function(){
   return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: true
        }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(gulp.dest('build/css'));
});

gulp.task("sprite-build", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
});

gulp.task("html-build", function () {
 return gulp.src("source/*.html")
   .pipe(posthtml([
     include()
   ]))
   .pipe(gulp.dest("build"));
 });

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style-build",
    "sprite-build",
    "html-build",
    "copyJs",
    "copyCss",
    done
  );
});

gulp.task("serve-build", ["style-build"], function () {
   server.init({
   server: "build/"
   });
   gulp.watch("source/sass/**/*.sass", ["style-build"]);
   gulp.watch("source/*.html", ["html-build"]);
 });
