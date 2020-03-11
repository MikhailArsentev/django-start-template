const { src, dest, watch, series, parallel } = require("gulp");
const webpack = require("webpack-stream");
const Fiber = require("fibers");
const uglify = require('gulp-uglify-es').default;

const pug = require("gulp-pug");
const prettify = require("gulp-jsbeautifier");
const pugLinter = require("gulp-pug-linter");

const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");

const named = require("vinyl-named");
const rename = require("gulp-rename");

const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageResize = require('gulp-image-resize');

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const gulpif = require("gulp-if");
const del = require("del");
const browserSync = require("browser-sync");

const config = require("./config.js");
const dir = config.dir;
const modeProdIndex = process.argv.indexOf("--prod");
const modeDjangoIndex = process.argv.indexOf("--django");

let mode = config.mode.dev;
let django = false;

if (modeProdIndex > -1) {
  mode = 'production';
}
if (modeDjangoIndex > -1) {
  django = true;
}

console.log(mode);
sass.compiler = require("sass");

function buildPug() {
  return src(`${dir.pug}pages/**/*.pug`)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(pug())
    .pipe(prettify({}))
    .pipe(dest(`${dir.public}`))
}
exports.buildPug = buildPug;

function buildScss() {
  return src(`${dir.scss}*.scss`)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(gulpif(mode === "development", sourcemaps.init()))
    .pipe(sass({ fiber: Fiber }).on("error", sass.logError))
    .pipe(
      autoprefixer({
        grid: true
      })
    )
    .pipe(cleanCSS())
    .pipe(gulpif(mode === "development", sourcemaps.write()))
    .pipe(dest(`${dir.publicStatic}css`))
    .pipe(gulpif(django, dest(`${dir.static}css`)));
}
exports.buildScss = buildScss;


const jsGlob = [`${dir.js}/*.js`, `!${dir.js}/*.exc.js`];
function transpileJs() {
  return src(jsGlob)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(named())
    .pipe(gulpif(
      mode === "development",
      webpack(require("./webpack.dev.js")),
      webpack(require("./webpack.prod.js")),
      )
    )
    .pipe(gulpif(
      django,
      dest(`${dir.static}js`),
      dest(`${dir.publicStatic}js`)
      )
    );
}
exports.transpileJs = transpileJs;

const uglifyOptions = {
  mangle: {
    toplevel: true,
  },
  nameCache: {},
  compress: {
    passes: 2
  },
  output: {
    beautify: false,
    preamble: "/* minified */",
    comments: false,
  }
};
function copyJsExc() {
  return src(`${dir.js}/*.exc.js`)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(rename((path) => {
      path.basename = path.basename.replace('.exc', '');
    }))
    .pipe(gulpif(mode === 'production', uglify(uglifyOptions)))
    .pipe(gulpif(
      django,
      dest(`${dir.static}js`),
      dest(`${dir.publicStatic}js`)
      )
    );
}
exports.copyJsExc = copyJsExc;

const buildJs = series(transpileJs, copyJsExc)
exports.buildJs = buildJs;

function jsAnalyze() {
  return src(jsGlob)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(named())
    .pipe(webpack(require("./webpack.analyze.js")));
}
exports.jsAnalyze = jsAnalyze;

function copyRootFiles() {
  return src('src/rootFiles/*')
    .pipe(gulpif(
      django,
      dest(dir.root_files),
      dest(`${dir.public}templates`)
      )
    );
}
exports.copyRootFiles = copyRootFiles;

function buildIcons(cb) {
  config.iconSizes.forEach(function (size) {
    return src('src/images/icons/*')
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(imageResize({
      imageMagick: true,
      width: size.width,
      height: size.heigth
    }))
    .pipe(rename((path) => {
      path.basename = `${path.basename}@${size.width}x${size.heigth}`;
    }))
    .pipe(gulpif(
      django,
      dest(`${dir.static}images/icons/`),
      dest(`${dir.publicStatic}images/icons/`)
      )
    );
  });
  cb();
}
exports.buildIcons = buildIcons;

function buildFonts() {
  return src(`${dir.fonts}`)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(gulpif(
      django,
      dest(`${dir.static}fonts`),
      dest(`${dir.publicStatic}fonts`)
      )
    );
}
exports.buildFonts = buildFonts;

function buildImages() {
  return src([`${dir.images}**/*`, '!src/images/icons/**'])
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imageminMozjpeg({ quality: 90, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulpif(
      django,
      dest(`${dir.static}images`),
      dest(`${dir.publicStatic}images`)
      )
    );
}
exports.buildImages = buildImages;

function testPug() {
  return src([`${dir.pug}**/*.pug`, `!${dir.pug}mixins/**`])
    .pipe(pugLinter({ reporter: 'default' }))
}
exports.testPug = testPug;

function serve(cb) {
  if (django) {
    browserSync.init(
      {
        proxy: "http://127.0.0.1:8000/",
      },
      cb
    );
  } else {
    browserSync.init(
      {
        server: dir.public,
        port: 8080,
        host: "0.0.0.0",
        startPath: "/templates/"
      },
      cb
    );

  }
}
exports.serve = serve;

function reload(cb) {
  browserSync.reload();
  cb();
}

const dirDictPublic = {
  css: `${dir.publicStatic}css`,
  js: `${dir.publicStatic}js`,
  images: `${dir.publicStatic}images`,
  fonts: `${dir.publicStatic}fonts`,
  templates: `${dir.public}templates`,
};

const dirDictDjango = {
  css: `${dir.static}css`,
  js: `${dir.static}js`,
  images: `${dir.static}images`,
  fonts: `${dir.static}fonts`,
  rootFiles: `${dir.root_files}`,
};

function clearAll() {
  const dirDict = django ? dirDictDjango : dirDictPublic;
  return del(Object.values(dirDict), { force: true });
}
exports.clearAll = clearAll;

function watcher() {
  const dirDict = django ? dirDictDjango : dirDictPublic;
  if (!django) {
    watch(
      `${dir.pug}**/*.pug`,
      series(
        function () {
          return del([dirDict.templates], { force: true });
        },
        buildPug,
        copyRootFiles,
        reload
      )
    );
  }  else {
    watch(
      `${dir.django_templates}**/*.html`,
      series(reload)
    );
  }
  watch(
    `${dir.scss}**/*.scss`,
    series(
      function () {
        return del([dirDict.css], { force: true });
      },
      buildScss,
      reload
    )
  );
  watch(
    [`${dir.js}`, `${dir.vue}`],
    series(
      function () {
        return del([dirDict.js], { force: true });
      },
      buildJs,
      reload
    )
  );
  watch(
    `${dir.images}**/*`,
    series(
      function () {
        return del([dirDict.images], { force: true });
      },
      buildImages,
      reload
    )
  );
  watch(
    `${dir.fonts}`,
    series(
      function () {
        return del([dirDict.fonts], { force: true });
      },
      buildFonts,
      reload
    )
  );
  watch(
    'src/rootFiles/',
    series(
      function () {
        return del([dirDictDjango.rootFiles], { force: true });
      },
      copyRootFiles,
      reload
    )
  );
}
exports.watcher = watcher;

const build = series(
  clearAll,
  buildImages,
  copyRootFiles,
  buildPug,
  buildScss,
  buildJs,
  buildFonts,
)

exports.build = build;

exports.default = series(build, serve, watcher);