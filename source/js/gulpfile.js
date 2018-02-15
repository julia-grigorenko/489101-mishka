var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    plumber      = require('gulp-plumber'),
    postcss      = require('gulp-postcss'),
    minify       = require('csso'),
    rename       = require('gulp-rename'),
    imagemin     = require("gulp-imagemin"),
    webp         = require("gulp-webp"),
    svgstore     = require("gulp-svgstore"),
    posthtml     = require("gulp-posthtml"),
    include      = require("posthtml-include")
    browserSync  = require('browser-sync').create(),
    run          = require('run-sequence');


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
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));
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


gulp.task("build", ["style"], function(done) {
  run("style", "sprite", "html", done);
});
