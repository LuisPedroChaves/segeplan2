import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { IdeaRegistrationRoutes } from './idea-bank.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogoComponent } from 'src/app/core/components/logo/logo.component';
import { NewIdeasComponent } from './pages/new-ideas/new-ideas.component';



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
    // components
    LogoComponent
  ]
})
export class IdeaBankModule { }
