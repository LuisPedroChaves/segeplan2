import { IComment } from "./comment";

export interface IAdvisoryDoc {
    id?: string;
    trackId?: string;
    goal: string;
    action: string;
    unitSpecific: string;
    sectorization: string;
    subSectorization: string;
    menAttended: number;
    womenAttended: number;
    totalAttended: number;
    counselingModality: string;
    advTheme: string;
    snipCode: string;
    projectName: string;
    participant: string;
    analysisDate: string;
    advDate: string;
    assistant: string;
    conclusions: string;
    recomend: string;
    doc: any;
    comments: IComment[];
}
