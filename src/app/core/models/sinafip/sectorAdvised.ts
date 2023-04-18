
export interface IsbSector {
    id?: string;
    name: string;
    advisedEntityId?: string;
}
export interface ISectorAdvised {
    id?: string;
    name: string;
    subSectorizations?: IsbSector[];
}
