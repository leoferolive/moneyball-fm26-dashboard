export interface FilterState {
  search: string
  ageRange: [number, number] | null
  minutesMin: number | null
  scoreRange: [number, number] | null
  clubs: string[]
  nationalities: string[]
  fmRatingMin: number | null
}

export const DEFAULT_FILTERS: FilterState = {
  search: '',
  ageRange: null,
  minutesMin: null,
  scoreRange: null,
  clubs: [],
  nationalities: [],
  fmRatingMin: null,
}
