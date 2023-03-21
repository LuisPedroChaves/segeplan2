import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { ReportRoutes } from './report.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRoutes),
    SharedModule
  ]
})
export class ReportModule { }
