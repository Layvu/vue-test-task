import { useWeatherStore } from '../stores/weatherStore';
import { fetchWeatherApi } from './openWeatherApi';

const activeConnections: Record<string, NodeJS.Timeout> = {};
const interval = 30 * 60 * 1000;

export const initWeatherWebSocket = (city: string) => {
  const store = useWeatherStore();

  if (activeConnections[city]) return () => {};

  const updateWeather = async () => {
    try {
      const weatherData = await fetchWeatherApi(city);
      if (weatherData) {
        store.forecast = weatherData;
        store.addNotification('Данные о погоде обновлены');
      }
    } catch (error) {
      console.error('Ошибка обновления погоды:', error);
      store.addNotification('Ошибка обновления погоды');
    }
  };

  activeConnections[city] = setInterval(updateWeather, interval);
  updateWeather();

  const closeMockWebSocket = () => {
    clearInterval(activeConnections[city]);
    delete activeConnections[city];
    store.addNotification(`Соединение закрыто для города: ${city}`);
  };

  return closeMockWebSocket;
};
