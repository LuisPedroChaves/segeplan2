import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeButtonComponent } from 'src/app/core/components/theme-button/theme-button.component';
import { LogoComponent } from 'src/app/core/components/logo/logo.component';
import { NewIdeaComponent } from 'src/app/core/components/ideaBank/new-idea/new-idea.component';
import { NewProjectTypeComponent } from 'src/app/core/components/configs/new-project-type/new-project-type.component';
import { NewDesignationComponent } from 'src/app/core/components/configs/new-designation/new-designation.component';
import { NewFinancingComponent } from 'src/app/core/components/configs/new-financing/new-financing.component';
import { NewPopulationComponent } from 'src/app/core/components/configs/new-population/new-population.component';
import { NewAlternativeComponent } from 'src/app/core/components/ideaBank/new-alternative/new-alternative.component';
import { IdeaDetailsComponent } from 'src/app/core/components/ideaBank/idea-details/idea-details.component';
import { StoreModule } from '@ngrx/store';
import { DenominationReducer } from '../../modules/config/store/reducers/denomination.reducer';
import { ProcesoReducer } from 'src/app/modules/idea-bank/store/reducers';
import { ReferencePopulationReducer } from 'src/app/modules/config/store/reducers';
import { NewDataGeoComponent } from 'src/app/core/components/ideaBank/new-data-geo/new-data-geo.component';
import { AlternativeDetailsComponent } from 'src/app/core/components/ideaBank/alternative-details/alternative-details.component';
import { NewRevelanceMatrixComponent } from 'src/app/core/components/ideaBank/new-revelance-matrix/new-revelance-matrix.component';
import { NewInitiativeComponent } from 'src/app/core/components/sinafip/new-initiative/new-initiative.component';
import { NewActivityComponent } from 'src/app/core/components/sinafip/new-activity/new-activity.component';
import { InitiativeDetailsComponent } from 'src/app/core/components/sinafip/initiative-details/initiative-details.component';
import { AdmitionMatrixComponent } from 'src/app/core/components/sinafip/admition-matrix/admition-matrix.component';
import { NewProjectComponent } from 'src/app/core/components/check-project/new-project/new-project.component';
import { NewTrackComponent } from 'src/app/core/components/check-project/new-track/new-track.component';
import { ModalGuideComponent } from 'src/app/core/components/check-project/modal-guide/modal-guide.component';
import { TrackDetailsComponent } from 'src/app/core/components/check-project/track-details/track-details.component';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    SharedModule,
    // components
    LogoComponent,
    ThemeButtonComponent,
    NewIdeaComponent,
    NewProjectTypeComponent,
    NewDesignationComponent,
    NewFinancingComponent,
    NewPopulationComponent,
    NewAlternativeComponent,
    IdeaDetailsComponent,
    NewDataGeoComponent,
    AlternativeDetailsComponent,
    NewRevelanceMatrixComponent,
    NewInitiativeComponent,
    NewActivityComponent,
    InitiativeDetailsComponent,
    AdmitionMatrixComponent,
    NewProjectComponent,
    NewTrackComponent,
    ModalGuideComponent,
    TrackDetailsComponent,
  ]
})
export class HomeModule { }
