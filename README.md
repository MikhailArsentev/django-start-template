# Django start template
Gulp + Webpack for Pug, SCSS, JS, Vue, Python (Django)

# Описание
### frontend
* именование классов по [БЭМ](https://ru.bem.info/)
* используются препроцессоры [Pug](https://pugjs.org/) и [dart SCSS](https://sass-scss.ru/dart-sass/)
* используется транспайлер JavaSCript compiler [Babel](https://babeljs.io/)
* используется [Webpack](https://webpack.js.org/) для сборки JavaScript и Vue компонентов
* используется [gulp-pug-linter](https://www.npmjs.com/package/gulp-pug-linter), [EsLint](https://eslint.org/)
### backend
* администрирование [Django](https://ru.wikipedia.org/wiki/Django)

## Пошаговая инструкция по запуску (для самых маленьких)
### Подготовка среды к работе
* устанавливаем [VSCODE](https://code.visualstudio.com/)
* устанавливаем расширение для работы с gitHub, авторизуемся
* устанавливаем [Python3](https://www.python.org/downloads/)
* устанавливаем [NodeJS](https://nodejs.org/en/)
* устанавливаем [Yarn](https://yarnpkg.com/en/docs/install)

### Подготовка проекта к работе
* [репозиторий](https://github.com/MikhailArsentev/django-start-template)
* жмем Use this template (зеленая кнопка), создаем свой проект
* в vs code открываем консоль
* клонируем репозиторий ````git clone https://github.com/__ваш_аккаунт__/___ваш_проект__/.git````
* создаем ветку в git ````git checkout -b html````
* открываем папку с проектом в vscode

### Frontend
* скачиваем и создаем зависимости ````yarn````
* запускаем сборщик ````yarn gulp````
#### команды
* ````yarn gulp```` (Сборка и запуск сервера в режиме development, сборка в папку public)
* ````yarn gulp buildDev```` (Сборка в режиме development)
* ````yarn gulp buildProd```` (Сборка в режиме production)
* ````yarn gulp testPug```` линтинг Pug файлов
* ````yarn gulp clear```` удалить все html, css, js, img файлы из соответсвующих папок (смотреть gulpfile.js и config.js)
Отдельные таски можно посмотреть в gulpfile.js

### Backend
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
Установлено proxy через http://127.0.0.1:8000 по этому изменения в фронтенде отображаются по этому пути

### Внедрение Django в PUG
* запускаем сборщик ````yarn gulp --django````
* во второй консоли запускаем сервер ````python manage.py runserver````
Сборка производится в папку jsoft_django/static и jsoft_django/templates, установлено proxy через http://127.0.0.1:8000, изменения отображаются по этому адресу

## Deploy
* на боевом сервере создаем сайты site.ru, dev.site.ru, html.site.ru
* настраиваем [deploy](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow) : с ветки dev на dev.site.ru, с ветки html на html.site.ru, с ветки master на site.ru
* закрываем сайты dev.site.ru и html.site.ru от индексации поисковиками
Deploy конфиги в папке .github/workflows

### dev and master branches merge
* сперва надо убедиться, что мы на ветке dev
* создаем коммит ````git add -A```` ; ````dit commit -m "__what_hew__"```` ; ````git hush```` 
* переходим на ветку master ````git checkout master````
* мержим ветку dev с веткой master команда ````git merge dev````
* команда ````git push````

### Настройка уведомлений в Slack
* инструкция по [ссылке](https://slack.com/apps/A0F7YS2SX-github-enterprise-server)

### Дополнительная информация
#### frontend
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

### ADD Bootstrap & Jquery
Установить bootstrap  ````yarn add bootstrap````
подключить его в main.scss :
```scss
    @forward '../../node_modules/bootstrap/scss/bootstrap-grid.scss';
```
Если нужен bootstrap.js, [документация тут](https://bootstrap-4.ru/docs/4.4/getting-started/webpack/), шаги:
Установить jquery  ````yarn add jquery````
Добавить jquery в main.js
```javascript
import 'jquery';
```
Подключить в webpack.common константу 
```javascript
    const webpack = require('webpack');
```
Добавить в секцию plugins в webpack.common:
```javascript
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }))
```
Добавить bootstrap в main.js
```javascript
import 'bootstrap';
```
Установить popper ````yarn add popper.js```` 

***
Благодарю за помощь в подготовке проекта [SharyginNikita](https://github.com/SharyginNikita/)