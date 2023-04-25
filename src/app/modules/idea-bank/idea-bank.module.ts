import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { IdeaRegistrationRoutes } from './idea-bank.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogoComponent } from 'src/app/core/components/logo/logo.component';
import { NewIdeasComponent } from './pages/new-ideas/new-ideas.component';
import { StoreModule } from '@ngrx/store';
import * as reducers from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effectsArray } from './store/effects';
import { ReferencePopulationReducer } from '../config/store/reducers/reference-population.reducer';
import { DenominationReducer } from '../config/store/reducers/denomination.reducer';
import { ReferencePopulationEffects } from '../config/store/effects/reference-population.effects';
import { DenominationsEffects } from '../config/store/effects/denomination.effects';



@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    NewIdeasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(IdeaRegistrationRoutes),
    SharedModule,
    StoreModule.forFeature('idea', reducers.IdeaReducer),
    StoreModule.forFeature('alternative', reducers.AlternativeReducer),
    StoreModule.forFeature('geografico', reducers.GeograficoReducer),
    StoreModule.forFeature('object', reducers.ObjectReducer),
    StoreModule.forFeature('preceso', reducers.ProcesoReducer),
    StoreModule.forFeature('proceso', reducers.ProcesoReducer),
    StoreModule.forFeature('referencePopulation', ReferencePopulationReducer),
    StoreModule.forFeature('denomination', DenominationReducer),
    EffectsModule.forFeature([...effectsArray, ReferencePopulationEffects, DenominationsEffects]),
    // components
    LogoComponent
  ]
})
export class IdeaBankModule { }
