const { src, dest,series, parallel } = require("gulp");

const del = require("delete");
const sass = require("gulp-dart-scss");
const sassdoc = require("sassdoc");

function borrar (cb) {
    del("./dist/css/main.css");
    cb();
}

function generar_css(){
    return src("./scss/main.scss").pipe(sass()).pipe(dest('./dist/css/'));
}

var doc_options = {
    dest : 'docs'
}

function generar_docs() {
    return src("./scss/main.scss").pipe(sassdoc(doc_options));
}

function mover(){
    return src('css/*.css').pipe(dest('dist/css/'));
}

exports.borrar = borrar;
exports.css = generar_css;
exports.docs = generar_docs;
exports.mover = mover;
exports.default = series(borrar, parallel(generar_css, generar_docs), mover);