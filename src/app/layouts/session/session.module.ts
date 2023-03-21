import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { SessionRoutes } from './session.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeButtonComponent } from '../../core/components/theme-button/theme-button.component';



@NgModule({
  declarations: [
    IndexComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SessionRoutes),
    SharedModule,
    // components
    ThemeButtonComponent
  ]
})
export class SessionModule { }
