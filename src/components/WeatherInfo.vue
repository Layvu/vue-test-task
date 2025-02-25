<template>
  <div class="weather-forecast">
    <div class="row q-col-gutter-md">
      <div class="col-auto" v-for="day in filteredForecast" :key="day.date">
        <q-card class="clickable" @click="openDetails(day)">
          <q-card-section class="text-center">
            <div class="text-h6">{{ day.date }}</div>
            <q-icon :name="getWeatherIcon(day.icon)" size="lg" color="primary" class="q-mt-sm" />
            <div class="text-subtitle1">
              В среднем {{ round((day.minTemp + day.maxTemp) / 2) }}°C
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="showDetails" transition-show="fade" transition-hide="fade">
      <q-card class="weather-forecast__details-card">
        <q-card-section class="row items-center justify-between">
          <div class="text-h5">{{ selectedDay?.date }}</div>
          <q-btn flat round dense icon="close" @click="showDetails = false" />
        </q-card-section>
        <q-card-section class="column items-center align-center">
          <q-icon
            :name="selectedDay?.icon ? getWeatherIcon(selectedDay.icon) : undefined"
            size="xl"
            color="primary"
            class="q-ml-md"
          />
          <div class="q-ml-md">{{ selectedDay?.description || '' }}</div>
        </q-card-section>
        <q-card-section>
          <q-list separator>
            <q-item>
              <q-item-section>Температура:</q-item-section>
              <q-item-section side
                >От {{ round(selectedDay?.minTemp) }}°C до
                {{ round(selectedDay?.maxTemp) }}°C</q-item-section
              >
            </q-item>
            <q-item>
              <q-item-section>Влажность:</q-item-section>
              <q-item-section side>{{ selectedDay?.humidity }}%</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Давление:</q-item-section>
              <q-item-section side>{{ selectedDay?.pressure }} hPa</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Ветер:</q-item-section>
              <q-item-section side>{{ round(selectedDay?.windSpeed) }} м/с</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useWeatherStore } from '@/stores/weatherStore';
import type { ForecastDay } from '@/types/common';

const store = useWeatherStore();
const { forecast } = storeToRefs(store);
const showDetails = ref(false);
const selectedDate = ref<string | null>(null);

const filteredForecast = computed<ForecastDay[]>(() => {
  if (!forecast.value) return [];

  const dailyData: Record<string, ForecastDay> = {};
  forecast.value.list.forEach((item) => {
    const [dateStr, timeStr] = item.dt_txt.split(' ');
    const date = new Date(`${dateStr}T${timeStr}Z`).toLocaleDateString('ru', {
      day: 'numeric',
      month: 'long',
    });
    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        minTemp: item.main.temp,
        maxTemp: item.main.temp,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        windSpeed: item.wind.speed,
        description: item.weather[0].description,
        icon: item.weather[0].main,
        hourlyTemps: [],
      };
    }
    dailyData[date].minTemp = Math.min(dailyData[date].minTemp, item.main.temp);
    dailyData[date].maxTemp = Math.max(dailyData[date].maxTemp, item.main.temp);
    dailyData[date].hourlyTemps.push({
      time: new Date(`${dateStr}T${timeStr}Z`).toLocaleTimeString('ru'),
      temp: item.main.temp,
    });
  });
  return Object.values(dailyData).slice(0, 7);
});

const selectedDay = computed<ForecastDay | null>(() => {
  if (!selectedDate.value || !filteredForecast.value.length) return null;
  return filteredForecast.value.find((day) => day.date === selectedDate.value) || null;
});

const openDetails = (day: ForecastDay) => {
  selectedDate.value = day.date;
  showDetails.value = true;
};

const getWeatherIcon = (condition: string) => {
  const icons: Record<string, string> = {
    clear: 'wb_sunny',
    clouds: 'cloud',
    rain: 'grain',
    snow: 'ac_unit',
    thunderstorm: 'flash_on',
  };
  return icons[condition.toLowerCase()];
};

const round = (value: number | undefined): number => (value === undefined ? 0 : Math.round(value));
</script>

<style lang="scss" scoped>
.weather-forecast {
  margin-top: $spacing-large;

  .row {
    display: flex;
    gap: $spacing-medium;
    overflow-x: auto;
    padding-bottom: $spacing-small;
  }

  .col-auto {
    flex: 0 0 auto;
    width: 220px;
  }

  .q-card {
    background: white;
    border-radius: 25px;
    box-shadow: $box-shadow;
    min-height: 150px;
    padding: $spacing-medium;
    transition: transform $transition-duration;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__details-card {
    border-radius: 15px;
  }
}
</style>
