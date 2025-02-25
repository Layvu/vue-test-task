# Weather App

Узнать актуальную информацию о погоде в интересующем городе

[Открыть Weather App](https://layvu-weather-app.netlify.app/)

## Функционал

- Поиск города с автодополнением
- Отображение прогноза погоды на ближайшие дни
- Расширенная информация о погоде в выбранный день
- Сохранение истории поиска в куки

## Используемые API

- **[OpenCage Geocoder API](https://opencagedata.com/api)** — определение реального города для автодополнения
- **[OpenWeatherMap API](https://openweathermap.org/api)** — получение данных о погоде

## Стэк

### Основное
- **Vue 3**
- **TypeScript**
- **Quasar**
- **Pinia**
- **Vite**

### Дополнительное
- **Axios**
- **Lodash**
- **Git**
- **ESLint & Prettier**

## WebSocket

- Обновление данных без перезагрузки страницы
- Сокращение количества запросов к API

*Примечание:* WebSocket реализован в виде эмуляции

## Установка и запуск

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/ваш-username/weather-app.git
   cd weather-app
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

4. Запустите проект локально:
   ```bash
   npm run dev
   ```
   
6. Для продакшен-сборки:
   ```bash
   npm run build
   ```
