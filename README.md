# Алкозамок-М ПРО. Frontend

## Обзор

Репозиторий для хранения исходных кодов и описания по проекту Алкозамок-М ПРО. Frontend.

## Предварительные условия

- Node.js
- Yarn

## Установка

1. Клонируйте репозиторий:
   ```bash
   git clone -b develop2 http://192.168.100.82/git/alcolock-m-pro-fe.git
   ```
2. Перейдите в директорию проекта:

   ```bash
   cd alcolock-m-pro-fe
   ```

3. Установите зависимости с помощью Yarn:
   ```bash
   yarn install
   ```

## Запуск

1. Чтобы запустить сервер разработки:

   ```bash
   yarn start
   ```

2. Откройте [http://localhost:3000](http://localhost:3000), чтобы просмотреть его в браузере.

## Сборка релиза через Docker

1. Соберите образ для сборки _(собирается один раз)_
   ```bash
   docker build --tag ls-node docker-build/
   ```
2. Выполните команду для сбоки, пример в `docker-build/build.sh`
   ```bash
   bash docker-build/build.sh
   ```
3. Результат сборки находится в папке `bulid`
