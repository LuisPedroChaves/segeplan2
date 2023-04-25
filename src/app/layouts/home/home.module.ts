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
    NewDataGeoComponent
  ]
})
export class HomeModule { }
