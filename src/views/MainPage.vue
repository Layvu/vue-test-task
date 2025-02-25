<template>
  <q-page class="page">
    <main class="page__content">
      <div v-if="notifications.length" class="notifications">
        <q-banner
          v-for="(notification, index) in notifications"
          :key="index"
          class="notifications__item"
        >
          {{ notification }}
        </q-banner>
      </div>
      <div class="page__main">
        <WeatherWidget />
        <WeatherInfo />
      </div>
    </main>
    <q-inner-loading :showing="isWeatherLoading || isSearchLoading" class="page__loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import WeatherWidget from '@/components/WeatherWidget.vue';
import WeatherInfo from '@/components/WeatherInfo.vue';
import { useWeatherStore } from '@/stores/weatherStore';
import { storeToRefs } from 'pinia';

const store = useWeatherStore();
const { isWeatherLoading, isSearchLoading, notifications } = storeToRefs(store);
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: $spacing-large;
  background-color: $background-color;
  position: relative;

  &__content {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: $spacing-medium;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: $spacing-medium;
  }

  &__loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
  }
}

.notifications {
  position: fixed;
  top: 100px;
  right: 400px;
  z-index: 100;

  &__item {
    background-color: white;
    border: 1px solid $primary-color;
    border-radius: 8px;
    box-shadow: $box-shadow;
    margin-bottom: $spacing-small;
    padding: $spacing-medium;
    font-size: 14px;
    color: $primary-color;
    font-weight: bold;

    &:hover {
      transform: scale(1.03);
    }
  }
}
</style>
