import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { CheckProjectRoutes } from './check-project.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CheckProjectRoutes),
    SharedModule
  ]
})
export class CheckProjectModule { }
