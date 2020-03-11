let config = {
  mode: {
    dev: 'development',
    prod: 'production'
  },
  dir: {
    django_templates: '../jsoft_django/templates/',
    root_files: '../jsoft_django/root_files/',
    static: '../jsoft_django/static/',
    public: './public/',
    publicStatic: './public/static/',
    scss: './src/scss/',
    pug: './src/templates/',
    images: './src/images/',
    js: './src/js/**',
    fonts: './src/fonts/**/*',
    vue: './src/{vuex, modules}/**/*.{js,vue}'
  },
  iconSizes: [
    { width: 16, heigth: 16 },
    { width: 32, heigth: 32 },
    { width: 57, heigth: 57 },
    { width: 60, heigth: 60 },
    { width: 70, heigth: 70 },
    { width: 72, heigth: 72 },
    { width: 76, heigth: 76 },
    { width: 96, heigth: 96 },
    { width: 114, heigth: 114 },
    { width: 120, heigth: 120 },
    { width: 128, heigth: 128 },
    { width: 144, heigth: 144 },
    { width: 150, heigth: 150 },
    { width: 160, heigth: 160 },
    { width: 152, heigth: 152 },
    { width: 180, heigth: 180 },
    { width: 192, heigth: 192 },
    { width: 310, heigth: 310 },
    { width: 310, heigth: 150 },
    { width: 384, heigth: 384 },
    { width: 512, heigth: 512 },
  ],
}

module.exports = config;
