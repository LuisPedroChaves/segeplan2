import { ReferencePopulation } from "./ReferencePopulation";
import { IPopulationAlt } from './populationAlt';

export interface PopulationDelimitation {
    codigo?: string;
    AlterId?: string;
    refPopId: string;
    denId: string;
    totalPopulation: number;
    gender?: string;
    estimateBeneficiaries: number;
    preliminaryCharacterization: string;
    coverage?: number;
    refPop?: ReferencePopulation;
    populations: IPopulationAlt[];
}
