<template>
  <div class="weather">
    <div class="weather__main">
      <h1 class="weather__title">
        {{ currentCityName ? `Погода в городе ${currentCityName}` : 'Узнать погоду' }}
      </h1>
      <q-input
        v-model="searchCity"
        label="Поиск города"
        outlined
        dense
        standout
        clearable
        clear-icon="close"
        :error="!!error"
        :error-message="error || undefined"
        no-error-icon
        @update:model-value="debouncedFetchCities"
        @clear="searchCity = ''"
        class="weather__input"
      >
        <template #append>
          <q-icon name="search" class="weather__icon" @click="searchCities(searchCity)" />
        </template>
      </q-input>

      <div v-if="suggestions.length" class="weather__suggestions">
        <div
          v-for="city in suggestions"
          :key="city.name"
          class="weather__suggestion"
          @click="selectCity(city)"
        >
          {{ formatCityName(city) }}
        </div>
      </div>
    </div>

    <aside class="weather__history" v-if="searchHistory.length">
      <h3 class="weather__history-title">История поиска</h3>
      <ul class="weather__history-list">
        <li
          v-for="city in searchHistory"
          :key="city"
          class="weather__history-item"
          @click="fetchWeather(city)"
        >
          {{ city }}
        </li>
      </ul>
      <button class="weather__history-clear" @click="clearHistory">Очистить</button>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useWeatherStore } from '@/stores/weatherStore';
import { storeToRefs } from 'pinia';
import { debounce } from 'lodash-es';
import { initWeatherWebSocket } from '@/utils/websocket';
import { getSearchHistory, addSearchHistory, clearSearchHistory } from '@/utils/cookieUtils';
import type { CityInfo } from '@/types/common';

const store = useWeatherStore();
const { searchCities, fetchWeather } = store;
const { currentCityName, error } = storeToRefs(store);
const searchCity = ref('');
const suggestions = ref<CityInfo[]>([]);
const searchHistory = ref<string[]>([]);

let closeWebSocket: (() => void) | null = null;

const formatCityName = ({ type, name, state, country }: CityInfo): string => {
  return [`${type} ${name}`, state, country].filter(Boolean).join(', ');
};

const debouncedFetchCities = debounce(async (value: string | number | null) => {
  if (typeof value === 'string' && value.trim()) {
    suggestions.value = await searchCities(value);
  } else {
    suggestions.value = [];
  }
}, 700);

const selectCity = async (city: CityInfo) => {
  searchCity.value = '';
  suggestions.value = [];
  await fetchWeather(city.name);
  addSearchHistory(city.name);
  searchHistory.value = getSearchHistory();

  if (closeWebSocket) closeWebSocket();
  closeWebSocket = initWeatherWebSocket(city.name);
};

const clearHistory = () => {
  clearSearchHistory();
  searchHistory.value = [];
};

onMounted(() => {
  searchHistory.value = getSearchHistory();
});

watch(error, (newError) => {
  if (newError) setTimeout(() => (store.error = ''), 3000);
});

onUnmounted(() => closeWebSocket?.());
</script>

<style lang="scss" scoped>
.weather {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &__main {
    flex: 1;
  }

  &__title {
    font-size: 24px;
    color: $primary-color;
    margin-bottom: $spacing-medium;
  }

  &__input {
    max-width: 400px;
  }

  &__icon {
    cursor: pointer;
  }

  &__suggestions {
    margin-top: $spacing-small;
    max-width: 400px;
  }

  &__suggestion {
    padding: $spacing-small $spacing-medium;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background: $secondary-color;
      color: white;
    }
  }

  &__history {
    width: 250px;
    padding: $spacing-small;
    background: #f9f9f9;
    border-radius: 8px;

    &-title {
      font-size: 18px;
      margin-bottom: $spacing-small;
    }

    &-list {
      list-style: none;
      padding: 0;
    }

    &-item {
      cursor: pointer;
      padding: $spacing-small;
      &:hover {
        background: $secondary-color;
        color: white;
      }
    }

    &-clear {
      margin-top: $spacing-small;
      background: $secondary-color;
      color: white;
      border: none;
      padding: $spacing-small $spacing-medium;
      cursor: pointer;
      border-radius: 4px;
    }
  }
}
</style>
