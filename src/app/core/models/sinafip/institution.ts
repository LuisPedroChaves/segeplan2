export interface IDocumentFinance{
    id?: string;
    institutionId?: string;
    name: string;
}

export interface Institution {
    id?: string;
    entityName: string;
    executionUnit?: string;
    functionProjName: string;
    generalStudy: string,
    dcmntPreinvest?: string;
    documentProject: string;
    responsibleName: string;
    contactEmail: string;
    phoneNumber: string;
    requestId?: string;
    documentsFinance? : IDocumentFinance[];
}
