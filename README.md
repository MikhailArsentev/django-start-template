# Django start template
Gulp + Webpack for Pug, SCSS, JS, Vue, Python [Django]

# About
### frontend
* именование классов по [БЭМ](https://ru.bem.info/)
* используются препроцессоры [Pug](https://pugjs.org/) и [dart SCSS](https://sass-scss.ru/dart-sass/)
* используется транспайлер JavaSCript compiler [Babel](https://babeljs.io/)
* используется [Webpack](https://webpack.js.org/) для сборки JavaScript и Vue компонентов
* используется [gulp-pug-linter](https://www.npmjs.com/package/gulp-pug-linter), [EsLint](https://eslint.org/)
### backend
* администрирование [Django]

## Установка
### frontend
* установите [NodeJS](https://nodejs.org/en/) и [Yarn](https://yarnpkg.com/en/docs/install) (если требуется)
* инициализируйте репозиторий: ````yarn init````
* скачайте необходимые зависимости: ````yarn````
* чтобы начать работу, введите команду: ````yarn gulp````
### backend
* установить [Python3](https://www.python.org/getit/)
* установить виртуальное окружение: ````python3 -m venv venv````
* Устанавливаем библиотеку Pillow для работы с изображениями ````python -m pip install Pillow````

## Команды
### frontend
* ````yarn gulp```` (Сборка и запуск сервера в режиме development)
* ````yarn gulp --prod```` (Сборка в режиме production)
* ````yarn gulp build-dev```` (Сборка в режиме development)
* ````yarn gulp build-prod```` (Сборка в режиме production)
* ````yarn gulp testPug```` линтинг Pug файлов
* ````yarn gulp clear```` удалить все html, css, js, img файлы из соответсвующих папок (смотреть gulpfile.js и config.js)
* Отдельные таски можно посмотреть в gulpfile.js
### backend
* активируем виртуальное окружение ````source venv/bin/activate````
* создаем базу данных в папке jsoft_django ````python manage.py migrate````
* упаковываем модели в отдельные файлы миграции ````python manage.py makemigrations````
* Выполняем миграцию ````python manage.py migrate````
* Создаем суперпользователя админ панели ````python manage.py createsuperuser````
* Запускаем сервер ````python manage.py runserver````

## Дополнительная информация
### frontend
* Pug миксин много-уровнего меню src/templates/mixins/menuList-mixin.pug (Документация внутри / documentation in file)
* Используется dart sass
* SCSS Lint Task был удален так как gulp-sass-lint на данный момент не поддерживает dart-sass
* EsLint выполняется при сборке JavaScript файлов
* Все пути указываются в файле config.js


## Задачи
### frontend
* добавить тесты для JavaScript
* добавить vue-lint
* добавить поддержку TypeScript
* добавить сборку спрайтов
