export interface Bake {
  id?: number
  date: string // ISO
  recipeId?: number
  breadType: string // ex: "Baguette tradition", "Pain T80 sur levain"
  flourType: string // T45, T65, T80, seigle, épautre...
  flourBrand?: string
  flourG: number
  waterG: number
  saltG: number
  starterG: number
  ambientTempC?: number
  bulkHours?: number
  proofHours?: number
  coldRetard: boolean
  scoreCrumb?: number // 1-5
  scoreCrust?: number // 1-5
  scoreTaste?: number // 1-5
  notes?: string
  photoDataUrl?: string
}

export interface Recipe {
  id?: number
  name: string
  flourType: string
  hydrationTargetPct: number
  steps: string
  phase?: number // 1-5 du plan de progression
}

export interface LevainLog {
  id?: number
  datetime: string // ISO
  ratio: string // ex: "1:2:2"
  state: 'actif' | 'molle' | 'pic'
  peakHours?: number
  notes?: string
}

export interface Milestone {
  id?: number
  phase: number
  label: string
  done: boolean
}
