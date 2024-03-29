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
import { SendIdeasComponent } from './pages/send-ideas/send-ideas.component';
import { DoneIdeasComponent } from './pages/done-ideas/done-ideas.component';
import { ResultIdeasComponent } from './pages/result-ideas/result-ideas.component';
import { RevelanceMatrixComponent } from './pages/revelance-matrix/revelance-matrix.component';
import { IdeaTableComponent } from './components/idea-table/idea-table.component';
import { AdvancePieComponent } from './components/advance-pie/advance-pie.component';
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { VerticalBarComponent } from './components/vertical-bar/vertical-bar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarVerticalComponent } from './components/bar-vertical/bar-vertical.component';



@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    NewIdeasComponent,
    SendIdeasComponent,
    DoneIdeasComponent,
    ResultIdeasComponent,
    RevelanceMatrixComponent,
    IdeaTableComponent,
    AdvancePieComponent,
    HorizontalBarComponent,
    PieChartComponent,
    VerticalBarComponent,
    BarVerticalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(IdeaRegistrationRoutes),
    SharedModule,
    StoreModule.forFeature('idea', reducers.IdeaReducer),
    StoreModule.forFeature('alternative', reducers.AlternativeReducer),
    StoreModule.forFeature('dataGeo', reducers.DataGeoReducer),
    StoreModule.forFeature('geografico', reducers.GeograficoReducer),
    StoreModule.forFeature('object', reducers.ObjectReducer),
    StoreModule.forFeature('preceso', reducers.ProcesoReducer),
    StoreModule.forFeature('proceso', reducers.ProcesoReducer),
    StoreModule.forFeature('referencePopulation', ReferencePopulationReducer),
    StoreModule.forFeature('denomination', DenominationReducer),
    EffectsModule.forFeature([...effectsArray, ReferencePopulationEffects, DenominationsEffects]),
    // components
    LogoComponent,
    NgxChartsModule,
  ]
})
export class IdeaBankModule { }
