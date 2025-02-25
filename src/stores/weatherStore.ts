import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ForecastResponse } from '@/types/weather'
import { searchCitiesApi } from '@/utils/citySearchApi'
import { fetchWeatherApi } from '@/utils/openWeatherApi'
import type { CityInfo } from '@/types/common'

export const useWeatherStore = defineStore('weather', () => {
  const currentCityName = ref<string | null>(null)
  const forecast = ref<ForecastResponse | null>(null)
  const error = ref<string | null>(null)
  const notifications = ref<string[]>([])
  const isWeatherLoading = ref(false)
  const isSearchLoading = ref(false)

  const addNotification = (message: string) => {
    notifications.value.push(message)
    setTimeout(() => {
      notifications.value.shift()
    }, 3000)
  }

  const fetchWeather = async (city: string) => {
    if (!city.trim()) return
    try {
      isWeatherLoading.value = true
      error.value = null
      const data = await fetchWeatherApi(city)
      if (data) {
        currentCityName.value = data.city.name
        forecast.value = data
      }
    } catch (err) {
      console.error('Ошибка получения данных о погоде:', err)
      error.value = 'Не удалось получить данные о погоде'
    } finally {
      isWeatherLoading.value = false
    }
  }

  const searchCities = async (query: string): Promise<CityInfo[]> => {
    if (!query.trim()) return []
    try {
      isSearchLoading.value = true
      error.value = null
      const cities = await searchCitiesApi(query)
      if (cities.length === 0) {
        error.value = 'Город не найден, пожалуйста, проверьте запрос'
      }
      return cities
    } catch (err) {
      console.error('Ошибка поиска городов:', err)
      return []
    } finally {
      isSearchLoading.value = false
    }
  }

  return {
    currentCityName,
    forecast,
    error,
    isWeatherLoading,
    isSearchLoading,
    notifications,
    fetchWeather,
    searchCities,
    addNotification,
  }
})
