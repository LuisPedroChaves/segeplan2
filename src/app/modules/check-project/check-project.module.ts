import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { CheckProjectRoutes } from './check-project.routing';
import { LogoComponent } from 'src/app/core/components/logo/logo.component';
import { ProjectFinishComponent } from './pages/project-finish/project-finish.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { StoreFeatureModule, StoreModule } from '@ngrx/store';
import { CheckProjectReducer, EntityReducer, GeograficoReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { CheckProjectEffects } from './store/effects';



@NgModule({
  declarations: [
    IndexComponent,
    ProjectFinishComponent,
    ProjectListComponent,
    DashboardComponent,
    ProjectTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CheckProjectRoutes),
    StoreModule.forFeature('checkProject', CheckProjectReducer ),
    StoreModule.forFeature('entity', EntityReducer),
    StoreModule.forFeature('geografico', GeograficoReducer),
    EffectsModule.forFeature(CheckProjectEffects),
    //components
    LogoComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckProjectModule { }
