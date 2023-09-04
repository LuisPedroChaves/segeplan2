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
import { CheckProjectReducer, EntityReducer, GeograficoReducer, SectorAdvisedReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { CheckProjectEffects, EntityEffects } from './store/effects';
import { SectorAdvisedEffects } from './store/effects/sectorAdvised.effects';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvancePieComponent } from './components/advance-pie/advance-pie.component';
import { VerticalBarComponent } from './components/vertical-bar/vertical-bar.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';



@NgModule({
  declarations: [
    IndexComponent,
    ProjectFinishComponent,
    ProjectListComponent,
    DashboardComponent,
    ProjectTableComponent,
    AdvancePieComponent,
    VerticalBarComponent,
    PieChartComponent,
    HorizontalBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CheckProjectRoutes),
    StoreModule.forFeature('checkProject', CheckProjectReducer ),
    StoreModule.forFeature('entity', EntityReducer),
    StoreModule.forFeature('geografico', GeograficoReducer),
    StoreModule.forFeature('sectorAdvised', SectorAdvisedReducer),
    EffectsModule.forFeature(CheckProjectEffects),
    EffectsModule.forFeature(EntityEffects),
    EffectsModule.forFeature(SectorAdvisedEffects),
    //components
    LogoComponent,
    NgxChartsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckProjectModule { }
