export interface IdeaReport  {
    codigo: string;
    productName: string;
    registerCode: string;
    nameEntity: string;
    definitionPotentiality: string;
    baseLine: string;
    alternatives: alternativeReport[];
}

export interface alternativeReport {
    codigo: string;
    typeProject: string;
    proccess: string;
    object: string;
    departament: string;
    municipality: string;
    nameEPI: string;
    complexity: string;
    estimatedCost: number;
    investmentCost: number;
    foundingSourcesName: string;
    executionDateMonth: string;
    executionDateYear: string;
    finishDateMonth: string;
    finishDateYear: string;
    etapaValor: string;
    etapaResultado: string;
    referencePop: string;
    denomination: string;
    type: string;
    total: number;
    type2: string;
    total2: number;
}