import { GeograficoEffects } from "../../../../core/store/effects/geografico.effects";
import { IdeaEffects } from "./idea.effects";
import { ObjectEffects } from "./object.effects";
import { ProcesoEffects } from "./proceso.effects";

export const effectsArray: any[] = [
  IdeaEffects,
  GeograficoEffects,
  ObjectEffects,
  ProcesoEffects
];
