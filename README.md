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
* создаем ветку в git ````git checkout -b html````
* открываем папку с проектом в vscode

### Для работы с frontend
* скачиваем и создаем зависимости ````yarn````
* запускаем сборщик ````yarn gulp````

### Для работы c backend открываем вторую консоль
* устанавливаем виртуальное окружение ````python3 -m venv venv````
* активируем виртуальное окружение ````source venv/bin/activate````
* устанавливаем Django ````pip install Django````
* обновляем pip ````pip install --upgrade pip````
* переходим в папку jsoft_django ````cd jsoft_django````
* устанавливаем библиотеку Pillow для работы с изображениями ````python -m pip install Pillow````
* создаем базу данных и выполняем миграцию моделей в нее ````python manage.py migrate````
* создаем суперпользователя админ панели ````python manage.py createsuperuser```` 
* указываем Логин, e-mail(не обязательно), пароль
* запускаем сервер, проверяем работоспособность http://127.0.0.1:8000/ ````python manage.py runserver````
(для gulp установлено proxy через http://127.0.0.1:8000 по этому изменения в фронтенде отображаются по этому пути)

### Для внедрения Django в PUG
* запускаем сборщик ````yarn gulp --django````
* во второй консоли запускаем сервер ````python manage.py runserver````
* изменения в PUG отображаются по адресу http://127.0.0.1:8000 (установлено proxy через http://127.0.0.1:8000)

## Команды
### frontend
* ````yarn gulp```` (Сборка и запуск сервера в режиме development)
* ````yarn gulp buildDev```` (Сборка в режиме development)
* ````yarn gulp buildProd```` (Сборка в режиме production)
* ````yarn gulp testPug```` линтинг Pug файлов
* ````yarn gulp clear```` удалить все html, css, js, img файлы из соответсвующих папок (смотреть gulpfile.js и config.js)
* Отдельные таски можно посмотреть в gulpfile.js
### backend
* создаем ветку в git ````git checkout -b dev````
* активируем виртуальное окружение ````source venv/bin/activate````
* создаем базу данных в корневой папке jsoft_django и/или выполняем миграцию ````python manage.py migrate````
* создаем суперпользователя админ панели ````python manage.py createsuperuser````
* сапускаем сервер ````python manage.py runserver````
### merge branch dev and master
* сперва надо убедиться, что мы на ветке dev
* создаем коммит ````git add -A```` ; ````dit commit -m "__what_hew__"```` ; ````git hush```` 
* переходим на ветку master ````git checkout master````
* мержим ветку dev с веткой master команда ````git merge dev````
* команда ````git push````

## Тестирование и продакшн на боевом сервере
* на боевом сервере создаем сайты "site.ru", "dev.site.ru", "html.site.ru"
* настраиваем [deploy](https://vk.com/im?sel=8928331) : с ветки dev на dev.site.ru, с ветки html на html.site.ru, с ветки master на site.ru
* закрываем сайты dev и html от индексации поисковиками

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