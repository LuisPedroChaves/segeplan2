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
import { IdeaReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effectsArray } from './store/effects';



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
    StoreModule.forFeature('idea', IdeaReducer),
    EffectsModule.forFeature(effectsArray),
    // components
    LogoComponent
  ]
})
export class IdeaBankModule { }
