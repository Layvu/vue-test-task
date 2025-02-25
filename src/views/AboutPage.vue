<template>
  <q-page class="page">
    <h1 class="page__title">Weather App</h1>
    <q-card class="page__card">
      <q-card-section class="page__content">
        <div class="info">
          <h2 class="info__subtitle">Функционал</h2>
          <p class="info__text">
            Обеспечивает доступ к актуальной информации о погоде в заданном городе
          </p>
          <ul class="info__list">
            <li class="info__item">Поиск города с автодополнением</li>
            <li class="info__item">Отображение прогноза погоды на ближайшие дни</li>
            <li class="info__item">Расширенная информация о погоде в выбранный день</li>
            <li class="info__item">Сохранение истории поиска в куки</li>
          </ul>
          <h2 class="info__subtitle">Стэк</h2>
          <p class="info__text">
            <strong>Основное:</strong> Vue 3, Typescript, Quasar, Pinia, Vite
          </p>
          <p class="info__text">
            <strong>Дополнительное:</strong> Axios, Lodash, Git, Eslint & Prettier
          </p>
          <h2 class="info__subtitle">WebSocket</h2>
          <ul class="info__list">
            <li class="info__item">Обновление данных без перезагрузки страницы</li>
            <li class="info__item">Сокращение количества запросов к API</li>
          </ul>
          <p class="info__text">
            Причина эмуляции: Создание WebSocket сервера является задачей backend-разработки и
            требует большего времени
          </p>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-large;

  &__title {
    font-size: 2rem;
    font-weight: bold;
    color: $primary-color;
    margin-bottom: $spacing-large;
    text-align: center;
  }

  &__card {
    max-width: 800px;
    width: 100%;
    background: white;
    border-radius: 12px;
    box-shadow: $box-shadow;
    padding: $spacing-large;
  }
}

.info {
  &__subtitle {
    font-size: 1.25rem;
    font-weight: bold;
    color: $secondary-color;
    margin-bottom: $spacing-medium;
  }

  &__text {
    font-size: 1rem;
    color: $text-color;
    margin-bottom: $spacing-small;
  }

  &__list {
    margin-left: $spacing-large;
    margin-bottom: $spacing-medium;
  }

  &__item {
    font-size: 1rem;
    color: $text-color;
    margin-bottom: $spacing-small;
  }
}
</style>
