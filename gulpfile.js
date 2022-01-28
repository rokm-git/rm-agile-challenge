const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const { src, dest, watch, series, parallel } = require("gulp");

const scssPath = "themes/adchallenge/sass/**/*.scss";
//const jsPath = "themes/adchallenge/js/*.js";

//Scss
function scssTask() {
  return src(["themes/adchallenge/sass/main.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer("last 2 version")]))
    .pipe(rename("style.css"))
    .pipe(sourcemaps.write("."))
    .pipe(dest("themes/adchallenge/css/"));
}

//Js
function jsTask() {
  return src(["themes/adchallenge/js/scripts.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("scripts.js"))
    .pipe(terser())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest("themes/adchallenge/js/"));
}

function watchTask() {
  watch([scssPath], { interval: 1000 }, parallel(scssTask));
}

// Manual Gulp Task
exports.scssTask = scssTask;
exports.jsTask = jsTask;
// Auto Task
exports.default = series(parallel(scssTask), watchTask);
