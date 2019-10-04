const { watch, src, dest, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

const config = {
    app: {
        js: [
            './src/js/**/*.js',
        ],
        scss: './src/style/**/*.scss',
        images: './src/img/*.*',
        gallery: './src/gallery/*.*',
        katalog: './src/katalog/*.*',
        slider: './src/slider/*.*',
        lightbox: './src/lightbox/*.*',
        lightboxImages: './src/images/*.*',
        html: './src/*.html'
    },
    dist: {
        base: './dist/',
        images: './dist/img',
        js: './dist/js',
        css: './dist/css',
        gallery: './dist/gallery',
        katalog: './dist/katalog',
        lightbox: './dist/lightbox',
        lightboxImages: './dist/images',
        slider: './dist/slider'
    }
}

function jsTask(done) {
    src(config.app.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('main.bundle.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(dest(config.dist.js))
    done();
}

function cssTask(done) {
    src(config.app.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(rename({ suffix: '.bundle' }))
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }), cssnano()]))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(config.dist.css))
    done();
}

function imagesTask(done) {
    src(config.app.images)
        .pipe(dest(config.dist.images))
    done();
}

function galleryTask(done) {
    src(config.app.gallery)
        .pipe(dest(config.dist.gallery))
    done();
}

function katalogTask(done) {
    src(config.app.katalog)
        .pipe(dest(config.dist.katalog))
    done();
}
function lightboxTask(done) {
    src(config.app.lightbox)
        .pipe(dest(config.dist.lightbox))
    done();
}
function lightboxImagesTask(done) {
    src(config.app.lightboxImages)
        .pipe(dest(config.dist.lightboxImages))
    done();
}

function sliderTask(done) {
    src(config.app.slider)
        .pipe(dest(config.dist.slider))
    done();
}

function templateTask(done) {
    src(config.app.html)
        .pipe(dest(config.dist.base))
    done();
}

function watchFiles() {
    watch(config.app.js, series(jsTask, reload));
    watch(config.app.scss, series(cssTask, reload));
    watch(config.app.images, series(imagesTask, reload));
    watch(config.app.gallery, series(galleryTask, reload));
    watch(config.app.katalog, series(katalogTask, reload));
    watch(config.app.lightbox, series(lightboxTask, reload));
    watch(config.app.lightboxImages, series(lightboxImagesTask, reload));
    watch(config.app.slider, series(sliderTask, reload));
    watch(config.app.html, series(templateTask, reload));
}

function liveReload(done) {
    browserSync.init({
        server: {
            baseDir: config.dist.base
        },
    });
    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

function cleanUp() {
    return del([config.dist.base]);
}

exports.dev = parallel(jsTask, cssTask, imagesTask, galleryTask, katalogTask, lightboxTask, lightboxImagesTask, sliderTask, templateTask, watchFiles, liveReload);
exports.build = series(cleanUp, parallel(jsTask, cssTask, imagesTask, galleryTask, katalogTask, lightboxTask, lightboxImagesTask, sliderTask, templateTask));
