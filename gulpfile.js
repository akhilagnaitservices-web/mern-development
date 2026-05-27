"use strict";

var gulp = require("gulp"),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin"),
    sass = require('gulp-sass')(require('sass')),
    sourcemaps = require("gulp-sourcemaps"),
    del = require('del'),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    npmdist = require('gulp-npm-dist'),
    browsersync = require("browser-sync"),
    fileinclude = require('gulp-file-include'),
    rtlcss = require('gulp-rtlcss'),
    babel = require('gulp-babel'),
    mergeStream = require('merge-stream');

// ─── NEW: spawn Express server ────────────────────────────────────────────────
var { spawn } = require('child_process');
var expressProcess = null;

function startExpress(done) {
    if (expressProcess) expressProcess.kill();
    expressProcess = spawn('node', ['server.js'], { stdio: 'inherit' });
    expressProcess.on('error', function (err) {
        console.error('Express failed to start:', err);
    });
    // Give Express a moment to bind before browser-sync proxies it
    setTimeout(done, 1000);
}
// ─────────────────────────────────────────────────────────────────────────────

var folder = {
    src: "src/",
    dist: "dist/",
    dist_assets: "dist/assets/"
};

// copy third party libs
function copyAssets() {
    var out = folder.dist_assets + "/libs/";
    return gulp
        .src(npmdist(), { base: './node_modules' })
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(gulp.dest(out));
}

// clean dist
function clean(done) {
    del.sync(folder.dist);
    done();
}

// images
function imageMin() {
    var out = folder.dist_assets + "images";
    return gulp
        .src(folder.src + "images/**/*")
        .pipe(newer(out))
        .pipe(imagemin())
        .pipe(gulp.dest(out));
}

// fonts
function fonts() {
    var out = folder.dist_assets + "fonts/";
    return gulp.src([folder.src + "fonts/**/*"]).pipe(gulp.dest(out));
}

// data
function data() {
    var out = folder.dist_assets + "data/";
    return gulp.src([folder.src + "data/**/*"]).pipe(gulp.dest(out));
}

// html templates
function html() {
    var out = folder.dist + "";
    return gulp
        .src([
            folder.src + "html/**/*", "!" + folder.src + "html/**/partials/**"
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest(out));
}

// sass → css
function css() {
    gulp
        .src([folder.src + "/scss/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['> 1%'] }))
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(folder.dist_assets + "css/"));

    return gulp
        .src([folder.src + "/scss/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['> 1%'] }))
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(rtlcss())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: "-rtl.min" }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(folder.dist_assets + "css/"));
}

// js
function jsPages() {
    var out = folder.dist_assets + "js/";
    return gulp.src(folder.src + "js/**/*.js")
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())
        .on("error", function (err) { console.log(err.toString()); })
        .pipe(gulp.dest(out));
}

// ─── UPDATED: browser-sync now proxies Express on port 3000 ──────────────────
function browserSync(done) {
    browsersync.init({
        proxy: "http://localhost:3000",   // ← Express handles requests
        port: 3001,                        // ← browser-sync UI on 3001
        open: true,
        notify: false,
    });
    done();
}
// ─────────────────────────────────────────────────────────────────────────────

function reloadBrowserSync(done) {
    browsersync.reload();
    done();
}

// watch
function watchFiles() {
    gulp.watch(folder.src + "html/**/*", gulp.series(html, reloadBrowserSync));
    gulp.watch(folder.src + "images/**/*", gulp.series(imageMin, reloadBrowserSync));
    gulp.watch(folder.src + "fonts/**/*", gulp.series(fonts, reloadBrowserSync));
    gulp.watch(folder.src + "scss/**/*", gulp.series(css, reloadBrowserSync));
    gulp.watch(folder.src + "js/**/*", gulp.series(jsPages, reloadBrowserSync));
}

gulp.task("watch", gulp.parallel(watchFiles, browserSync));

// ─── UPDATED default: starts Express first, then browser-sync proxies it ─────
gulp.task(
    "default",
    gulp.series(
        copyAssets,
        html,
        imageMin,
        fonts,
        data,
        css,
        jsPages,
        startExpress,   // ← start Express before browser-sync
        'watch'
    )
);
// ─────────────────────────────────────────────────────────────────────────────

// build (no server needed)
gulp.task(
    "build",
    gulp.series(
        clean,
        copyAssets,
        html,
        imageMin,
        fonts,
        data,
        css,
        jsPages
    )
);
