import { IDelimitPopulation } from './delimitPopulation';
export interface Delimit {
    id?: string;
    nameRefPop: string;
    denomination: string;
    estimatedBenef: string;
    requestId?: string;
    departament: string;
    municipality: string;
    populations: IDelimitPopulation[];
}
