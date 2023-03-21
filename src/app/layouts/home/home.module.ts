import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeButtonComponent } from 'src/app/core/components/theme-button/theme-button.component';
import { LogoComponent } from 'src/app/core/components/logo/logo.component';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    SharedModule,
    // components
    LogoComponent,
    ThemeButtonComponent
  ]
})
export class HomeModule { }
