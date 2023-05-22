import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { ReportRoutes } from './report.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogoComponent } from 'src/app/core/components/logo/logo.component';
import { IdeaBankComponent } from './pages/idea-bank/idea-bank.component';
import { SinafipComponent } from './pages/sinafip/sinafip.component';
import { CheckProjectComponent } from './pages/check-project/check-project.component';
import { StoreModule } from '@ngrx/store';
import * as reducers from './../idea-bank/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effectsArray } from '../idea-bank/store/effects';


@NgModule({
  declarations: [
    IndexComponent,
    IdeaBankComponent,
    SinafipComponent,
    CheckProjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRoutes),
    SharedModule,
    StoreModule.forFeature('geografico', reducers.GeograficoReducer),
    StoreModule.forFeature('object', reducers.ObjectReducer),
    StoreModule.forFeature('preceso', reducers.ProcesoReducer),
    StoreModule.forFeature('proceso', reducers.ProcesoReducer),
    EffectsModule.forFeature([...effectsArray]),
    
    // components
    LogoComponent
  ]
})
export class ReportModule { }
