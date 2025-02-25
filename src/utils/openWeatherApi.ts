import axios from 'axios'
import type { ForecastResponse } from '@/types/weather'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const fetchWeatherApi = async (city: string): Promise<ForecastResponse | null> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
        lang: 'ru',
      },
    })
    return data
  } catch (err) {
    console.error('Ошибка получения данных о погоде:', err)
    return null
  }
}
