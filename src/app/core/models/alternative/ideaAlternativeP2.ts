import { GeographicArea } from "./GeographicArea";
import { ProjectDescription } from "./ProjectDescription";
import { Qualification } from './Qyualification';
import { preInvestment } from "./preInvestment";

export interface IdeaAlternativeTwo {
    geoArea: GeographicArea;
    projDesc: ProjectDescription;
    qualification?: Qualification;
    preInvestment?: preInvestment;
}
