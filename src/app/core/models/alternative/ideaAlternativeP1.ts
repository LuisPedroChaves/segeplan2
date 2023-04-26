import { PopulationDelimitation } from "./PopulationDelimitation";
import { PreliminaryName } from "./PreliminaryName";
import { ResponsibleEntity } from "./ResponsibleEntity";

export interface IdeaAlternativeOne {
    sectionBIId: string;
    preName: PreliminaryName;
    resEntity: ResponsibleEntity;
    popDelimit: PopulationDelimitation;
}
