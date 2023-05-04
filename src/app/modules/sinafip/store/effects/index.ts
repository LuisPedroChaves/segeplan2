import { EntityEffects } from "./entity.effects";
import { GeneralStudyEffects } from "./generalStudy.effects";
import { InitiativeEffects } from "./initiative.effects";
import { ModalityFinancingEffects } from "./modalityFinancing.effects";
import { PreinvDocumentEffects } from "./preinvDocument.effects";
import { ProjectFunctionEffects } from "./projectFunction.effects";

export const sinafipEffects: any[] = [
  InitiativeEffects,
  EntityEffects,
  ProjectFunctionEffects,
  GeneralStudyEffects,
  PreinvDocumentEffects,
  ModalityFinancingEffects
];
