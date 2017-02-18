"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var server = require("browser-sync").create();
var run = require("run-sequence");
var rename = require("gulp-rename");
var del = require("del");
var sourcemaps = require("gulp-sourcemaps");
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");

var postcss = require("gulp-postcss");
var cssnext = require("postcss-cssnext");
var precss = require("precss");
var autoprefixer = require("autoprefixer");
var minifyCss = require("gulp-csso");


////
//Обрабатывает стили препроцессором, автопрефиксером и минифицирует конечный файл.
////
gulp.task("style", function() {
  gulp.src("postcss/style.css")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(postcss([
      precss(),
      cssnext()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minifyCss())
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


////
//Копирует html файлы из корня в папку сборки.
////
gulp.task("html", function() {
  return gulp.src([
    "*.html"
  ], {
    base: "."
  })
    .pipe(gulp.dest("build"));
})

////
//Копирует js файлы из /js в папку сборки.
////
gulp.task("js", function() {
  return gulp.src([
    "js/*.js"
  ], {
    base: "."
  })
    .pipe(gulp.dest("build"));
})

////
//Оптимизирует изображения из /img. Обработанные файлы заменяют оригинальные.
////
gulp.task("images", function() {
  return gulp.src("img/**/*.{png,jpg,gif}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
  ]))
  .pipe(gulp.dest("img/"));
});

////
//Оптимизирует SVG-изображения. Не заменяет оригинальных файлов.
////
gulp.task("svgmin", function() {
  return gulp.src([
    "img/**/*.svg"
  ], {
    base: "."
  })
    .pipe(svgmin())
    .pipe(gulp.dest("build"));
});

////
//Активирует browser-sync с заданными параметрами.
////
gulp.task("serve", function() {
  server.init({
    server: "build",
    ghostMode: false, //синхронизация активности на странице между всеми подключенными устройствами
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

////
//Следят за исходниками
////
gulp.watch(["*.html"], ["html"]); //следит за html-файлами в корне
gulp.watch("js/*.js", ["js"]); //следит за js-файлами в js/
gulp.watch("postcss/**/*.css", ["style"]); //следит за less-файлами

////
//Следят за файлами сборки и перезагружают страницу в browser-sync
////
gulp.watch("build/*.html").on("change", server.reload); //следит за html-файлами в папке сборки
gulp.watch("build/js/*.js").on("change", server.reload); //следит за js-файлами в js/ папки сборки
});

////
//Копирует все исходники, не подлежащие компиляции, в папку сборки
////
gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**/*.{png,jpg,gif}",
    "js/**",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
})

////
//Очищает папку сборки перед копированием новых файлов
////
gulp.task("clean", function () {
  return del("build");
});

////
//Запускает последовательность задач для формирования сборки
////
gulp.task("build", function (fn) {
  run(
    "clean",
    "copy",
    "svgmin",
    "style",
    fn
  );
});
