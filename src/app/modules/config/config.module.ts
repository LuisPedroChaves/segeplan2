import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { ConfigRoutes } from './config.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogoComponent } from '../../core/components/logo/logo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DesignationsComponent } from './pages/designations/designations.component';
import { ReferencePopulationsComponent } from './pages/reference-populations/reference-populations.component';
import { FinancingsComponent } from './pages/financings/financings.component';
import { ProjectTypesComponent } from './pages/project-types/project-types.component';
import { StoreModule } from '@ngrx/store';
import { DenominationReducer, FinancingReducer, ReferencePopulationReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effectsArray } from './store/effects';
import { FilterComponent } from 'src/app/core/components/filter/filter.component';
import { RevelanceMatrixComponent } from './pages/revelance-matrix/revelance-matrix.component';
import { AdmitionMatrixComponent } from './pages/admition-matrix/admition-matrix.component';



@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    DesignationsComponent,
    ReferencePopulationsComponent,
    FinancingsComponent,
    ProjectTypesComponent,
    RevelanceMatrixComponent,
    AdmitionMatrixComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ConfigRoutes),
    SharedModule,
    EffectsModule.forFeature(effectsArray),
    StoreModule.forFeature('denomination', DenominationReducer),
    StoreModule.forFeature('referencePopulation', ReferencePopulationReducer),
    StoreModule.forFeature('financing', FinancingReducer),
    // components
    LogoComponent,
    FilterComponent
  ]
})
export class ConfigModule { }
