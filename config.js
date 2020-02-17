let config = {
    mode: {
        dev: 'development',
        prod: 'production'
    },
    dir: {
        django_templates: './jsoft_django/templates/jsoft_cms/',
        static: './jsoft_django/static/public/',
        public: './public/',
        scss: './src/scss/',
        pug: './src/templates/',
        images: './src/images/',
        js: './src/js/**/*.js',
        fonts: './src/fonts/**/*',
        vue: './src/{vuex, modules}/**/*.{js,vue}'
    }
}

module.exports = config;
