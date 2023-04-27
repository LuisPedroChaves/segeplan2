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
    // components
    LogoComponent
  ]
})
export class ReportModule { }
