
export interface IRevelanceMatrix {
  id?: string,
  investmentRangeMin: number,
  investmentRangeMax: number,
  investmentRangeValue: number,

  beneficiariesRangeMin: number,
  beneficiariesRangeMax: number,
  beneficiariesRangeValue: number,

  complexyRangeMin: number,
  complexyRangeMax: number,
  complexyRangeValue: number,

  stageRangeMin: number,
  stageRangeMax: number,
  stageRangeValue: number,
}

