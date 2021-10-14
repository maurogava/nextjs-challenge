export enum PlanNames {
  sm = '2x5',
  md = '5x10',
  lg = '10x20',
  xl = '20x50',
}

export interface RawStoragePlan {
  plan: PlanNames
  name: string
  'base price': string
}

export interface StoragePlan {
  plan: PlanNames
  name: string
  basePrice: number
  description?: string
}
