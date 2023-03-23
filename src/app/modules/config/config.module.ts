import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { ConfigRoutes } from './config.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogoComponent } from '../../core/components/logo/logo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DesignationsComponent } from './pages/designations/designations.component';
import { ReferencePopulationsComponent } from './pages/reference-populations/reference-populations.component';
import { FinancingsComponent } from './pages/financings/financings.component';



@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    DesignationsComponent,
    ReferencePopulationsComponent,
    FinancingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ConfigRoutes),
    SharedModule,
    // components
    LogoComponent
  ]
})
export class ConfigModule { }
