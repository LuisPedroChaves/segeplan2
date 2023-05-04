import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { SinafipRoutes } from './sinafip.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { InitiativeReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { sinafipEffects } from './store/effects';
import { GeograficoReducer } from '../idea-bank/store/reducers';
import { DenominationReducer, ReferencePopulationReducer } from '../config/store/reducers';
import { ProductReducer } from 'src/app/core/store/reducers';
import { EntityReducer } from './store/reducers/entity.reducer';
import { ProjectFunctionReducer } from './store/reducers/projectFunction.reducer';
import { GeneralStudyReducer } from './store/reducers/generalStudy.reducer';
import { PreinvDocumentReducer } from './store/reducers/preinvDocument.reducer';
import { ModalityFinancingReducer } from './store/reducers/modalityFinancing.reducer';



@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SinafipRoutes),
    SharedModule,
    StoreModule.forFeature('initiative', InitiativeReducer),
    StoreModule.forFeature('entity', EntityReducer),
    StoreModule.forFeature('projectFunction', ProjectFunctionReducer),
    StoreModule.forFeature('generalStudy', GeneralStudyReducer),
    StoreModule.forFeature('preinvDocument', PreinvDocumentReducer),
    StoreModule.forFeature('modalityFinancing', ModalityFinancingReducer),
    StoreModule.forFeature('geografico', GeograficoReducer),
    StoreModule.forFeature('denomination', DenominationReducer),
    StoreModule.forFeature('referencePopulation', ReferencePopulationReducer),
    StoreModule.forFeature('product', ProductReducer),
    EffectsModule.forFeature(sinafipEffects)
  ]
})
export class SinafipModule { }
