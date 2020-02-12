# Django start template
Gulp + Webpack for Pug, SCSS, JS, Vue, Python [Django]

# Описание
### frontend
* именование классов по [БЭМ](https://ru.bem.info/)
* используются препроцессоры [Pug](https://pugjs.org/) и [dart SCSS](https://sass-scss.ru/dart-sass/)
* используется транспайлер JavaSCript compiler [Babel](https://babeljs.io/)
* используется [Webpack](https://webpack.js.org/) для сборки JavaScript и Vue компонентов
* используется [gulp-pug-linter](https://www.npmjs.com/package/gulp-pug-linter), [EsLint](https://eslint.org/)
### backend
* администрирование [Django]

# Пошаговая инструкция по запуску (для самых маленьких)
## Подготовка среды к работе
* устанавливаем [VSCODE](https://code.visualstudio.com/)
* устанавливаем расширение для работы с gitHub
* устанавливаем [Python3](https://www.python.org/downloads/)
* устанавливаем [NodeJS](https://nodejs.org/en/)
* устанавливаем [Yarn](https://yarnpkg.com/en/docs/install)

## Подготовка проекта к работе
* [репозиторий](https://github.com/MikhailArsentev/django-start-template)
* жмем Use this template (зеленая кнопка), создаем свой проект
* в vs code открываем консоль
* клонируем репозиторий ````git clone https://github.com/__ваш_аккаунт__/___ваш_проект__/.git````
* открываем папку с проектом в vscode

### Для работы с frontend
* устанавливаем Yarn и создаем зависимости ````yarn````
* Запускаем watcher ````yarn gulp````
(установлено proxy через http://127.0.0.1:8000 по этому работать бдует только после запуска python runserver)

### Для работы с backend открываем вторую консоль
* устанавливаем виртуальное окружение ````python3 -m venv venv````
* активируем виртуальное окружение ````source venv/bin/activate````
* устанавливаем Django ````pip install Django````
* обновляем pip ````pip install --upgrade pip````
* переходим в папку jsoft_django cd jsoft_django
* устанавливаем библиотеку Pillow для работы с изображениями ````python -m pip install Pillow````
* создаем базу данных и выполняем миграцию моделей в нее ````python manage.py migrate````
* создаем суперпользователя админ панели ````python manage.py createsuperuser```` 
* указываем Логин, e-mail(не обязательно), пароль
* запускаем сервер, проверяем работоспособность http://127.0.0.1:8000/ ````python manage.py runserver````

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
* создаем базу данных в корневой папке jsoft_django и/или выполняем миграцию ````python manage.py migrate````
* Создаем суперпользователя админ панели ````python manage.py createsuperuser````
* Запускаем сервер ````python manage.py runserver````

## Дополнительная информация
### frontend
* Pug миксин многоуровнего меню src/templates/mixins/menuList-mixin.pug (Документация внутри)
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

Благодарим за помощь в подготовке проекта [SharyginNikita](https://github.com/SharyginNikita/)