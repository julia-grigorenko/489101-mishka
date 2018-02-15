var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    plumber      = require('gulp-plumber'),
    postcss      = require('gulp-postcss'),
    minify       = require('gulp-csso'),
    rename       = require('gulp-rename'),
    imagemin     = require("imagemin"),
    webp         = require("cwebp"),
    svgstore     = require("gulp-svgstore"),
    posthtml     = require("gulp-posthtml"),
    include      = require("posthtml-include"),
    run          = require('run-sequence'),
    del          = require("del"),
    server = require("browser-sync").create();


gulp.task('style', function(){
   gulp.src('source/sass/**/*.sass')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('source/css'));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("_sprite.svg"))
    .pipe(gulp.dest("source/img"))
});

gulp.task("html", function () {
 return gulp.src("source/*.html")
   .pipe(posthtml([
     include()
   ]))
   .pipe(gulp.dest("source"));
 });

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
 return gulp.src("source/img/**/*.{png,jpg}")
     .pipe(webp({quality: 90}))
     .pipe(gulp.dest("source/img"));
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html").on("change", server.reload);
});



gulp.task("copy", function () {
 return gulp.src([
   "source/fonts/**/*.{woff,woff2}",
   "source/img/**",
   "source/js/**",
   "source/css/**",
   "source/*.html"
   ], {
     base: "source"
   })
   .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
 return del("build");
});

gulp.task('style-build', function(){
   gulp.src('source/sass/style.sass')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
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
