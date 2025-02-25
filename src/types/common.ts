export enum CityTypes {
  City = 'Город',
  Town = 'Посёлок',
  Village = 'Деревня',
  Hamlet = 'Хутор',
  Country = 'Страна',
  Island = 'Остров',
  Region = 'Регион',
}

export interface CityInfo {
  name: string
  type: CityTypes
  country?: string
  state?: string
}

export interface ForecastDay {
  date: string
  minTemp: number
  maxTemp: number
  humidity: number
  pressure: number
  windSpeed: number
  description: string
  icon: string
  hourlyTemps: { time: string; temp: number }[]
}
