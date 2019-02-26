"use strict";

// Load plugins
const gulp = require("gulp"),
browserSync = require("browser-sync").create(),
sass = require("gulp-sass"),
postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer"),
cssnano = require("cssnano"),
sourcemaps = require("gulp-sourcemaps");

var paths = {
    styles: {
        src : "app/**/*.scss",
        dest: "app/css"
    },
    html : {
        src: "app/*.html",
        dest: "app/*.html"
    }
}

function style() {

    return(
        gulp.src("app/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({stream: true}))
    );
}

function reload() {
    browserSync.reload();
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    })
    gulp.watch(paths.styles.src, style)
    gulp.watch(paths.html.src, reload);
}


exports.style = style; //allows running from CLI.
exports.watch = watch;