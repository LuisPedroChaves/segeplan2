import { Institution } from "./institution";
import { InvestmentProject } from './investmentProject';
import { RequiredDocument } from "./requiredDocument";
import { StudyDescription } from "./studyDescription";
import { Delimit } from './delimit';
import { AdmissionQuanty } from './admissionQuanty';
import { IPriorizationMatrix } from "./priorizationMatrix";

export interface IRequest {
    id?: string;
    correlative?: number;
    result?: string;
    status?: string;
    author?: string;
    advser?: string;
    reviewd?: string;
    created?: string;
    hasFinancing?: boolean;
    financing?: string;
    institution: Institution;
    investment: InvestmentProject;
    studyDescription: StudyDescription;
    delimit: Delimit
    requirementsDocuments: RequiredDocument;
    admissionQuanty?: AdmissionQuanty;
    priorizationQuanty?: IPriorizationMatrix;
}
