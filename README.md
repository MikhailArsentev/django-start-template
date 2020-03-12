# Django start template
Gulp + Webpack for Pug, SCSS, JS, Vue, Python (Django)

# Описание
### frontend
именование классов по [БЭМ](https://ru.bem.info/)
используются препроцессоры [Pug](https://pugjs.org/) и [dart SCSS](https://sass-scss.ru/dart-sass/)
используется транспайлер JavaSCript compiler [Babel](https://babeljs.io/)
используется [Webpack](https://webpack.js.org/) для сборки JavaScript и Vue компонентов
используется [gulp-pug-linter](https://www.npmjs.com/package/gulp-pug-linter), [EsLint](https://eslint.org/)
### backend
администрирование [Django](https://ru.wikipedia.org/wiki/Django)

## Пошаговая инструкция по запуску (для самых маленьких)
### Подготовка среды к работе
Устанавливаем:
[Python3](https://www.python.org/downloads/)
[NodeJS](https://nodejs.org/en/)
[Yarn](https://yarnpkg.com/en/docs/install)
[Image Magic](https://imagemagick.org/script/download.php). Для Mac OS ````brew install imagemagick````

### Frontend
скачиваем и создаем зависимости ````yarn````
запускаем сборщик ````yarn gulp````

#### команды
* ````yarn gulp```` (Сборка и запуск сервера в режиме development, сборка в папку public)
* ````yarn gulp buildDev```` (Сборка в режиме development)
* ````yarn gulp buildProd```` (Сборка в режиме production)
* ````yarn gulp testPug```` линтинг Pug файлов
* ````yarn gulp buildIcons```` запускаем таску для подготовки иконок
> Отдельные таски можно посмотреть в gulpfile.js

#### Особенности сборки
Добавление постфикса .exc к названию JS файла отключает его полифилы. Файл будет просто перемещен в Public без изменений и без постфикса. Пример: main.exc.js -> public/js/main.js


### Backend
устанавливаем виртуальное окружение **в папке jsoft_django** ````python3 -m venv venv````
активируем виртуальное окружение ````source venv/bin/activate````
обновляем pip ````pip install --upgrade pip````
все библиотеки и зависимости можно установить **одной командой** (из папки jsoft_django) ````pip install -r reqs.txt````
(перед тем как пушить проект, запишем список зависимостей ````pip freeze > reqs.txt````)
Но можно по отдельности:
Переходим в папку jsoft_django, устанавливаем Django ````pip install Django````
устанавливаем библиотеку Pillow для работы с изображениями ````python -m pip install Pillow````
создаем базу данных и выполняем миграцию моделей в нее ````python manage.py migrate````
создаем суперпользователя админ панели ````python manage.py createsuperuser```` указываем Логин, e-mail(не обязательно), пароль
запускаем сервер, проверяем работоспособность http://127.0.0.1:8000/ ````python manage.py runserver````
вход в админку [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

### Передача статики в Django
запускаем сборщик ````yarn gulp --django````
> Сборка производится в папку jsoft_django/static. Установлено proxy через http://127.0.0.1:8000, изменения в статике отображаются по этому адресу

## Deploy
на боевом сервере создаем сайты site.ru, dev.site.ru
настраиваем [deploy](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow) : с ветки dev на dev.site.ru, с ветки master на site.ru
закрываем сайт dev.site.ru от индексации поисковиками
Deploy конфиги в папке .github/workflows

### dev and master branches merge
сперва надо убедиться, что мы на ветке dev
создаем коммит ````git add -A```` ; ````dit commit -m "__what_hew__"```` ; ````git push````
переходим на ветку master ````git checkout master````
мержим ветку dev с веткой master команда ````git merge dev````
команда ````git push````

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
