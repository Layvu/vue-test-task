import axios from 'axios'
import { CityComponent } from '@/types/citySearch'
import type { CityResult, CitySearchResponse } from '@/types/citySearch'
import { CityTypes, type CityInfo } from '@/types/common'

const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY

export const searchCitiesApi = async (query: string): Promise<CityInfo[]> => {
  try {
    const { data } = await axios.get<CitySearchResponse>(
      `https://api.opencagedata.com/geocode/v1/json`,
      {
        params: {
          q: query,
          key: OPENCAGE_API_KEY,
          language: 'ru',
          limit: 5,
        },
      },
    )

    if (data.status.code === 200) {
      return data.results
        .flatMap((result: CityResult) =>
          Object.entries(CityComponent).map(([key, value]) => {
            if (value !== CityComponent.Country && key in CityTypes) {
              const componentName = result.components?.[value]
              if (componentName) {
                const city: CityInfo = {
                  name: componentName,
                  type: CityTypes[key as keyof typeof CityTypes],
                  state: result.components?.state || undefined,
                  country: result.components?.country || undefined,
                }
                return city
              }
            }
            return null
          }),
        )
        .filter((city): city is CityInfo => city !== null)
    }
    return []
  } catch (err) {
    console.error('Ошибка при поиске городов:', err)
    return []
  }
}
