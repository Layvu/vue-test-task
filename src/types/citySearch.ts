export enum CityComponent {
  City = 'city',
  Town = 'town',
  Village = 'village',
  Hamlet = 'hamlet',
  Country = 'country',
  Island = 'island',
  State = 'state',
}

export interface CityResult {
  components: {
    [key in CityComponent]?: string
  }
}

export interface CitySearchResponse {
  results: CityResult[]
  status: {
    code: number
  }
}
