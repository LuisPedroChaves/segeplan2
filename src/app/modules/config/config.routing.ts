import { Routes } from "@angular/router";
import { IndexComponent } from './pages/index/index.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DesignationsComponent } from './pages/designations/designations.component';
import { ReferencePopulationsComponent } from './pages/reference-populations/reference-populations.component';
import { FinancingsComponent } from './pages/financings/financings.component';
import { ProjectTypesComponent } from "./pages/project-types/project-types.component";

export const ConfigRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'designations',
        // canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE']
        },
        component: DesignationsComponent,
      },
      {
        path: 'referencePopulations',
        // canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE']
        },
        component: ReferencePopulationsComponent,
      },
      {
        path: 'financings',
        // canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE']
        },
        component: FinancingsComponent,
      },
      {
        path: 'projectTypes',
        // canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE']
        },
        component: ProjectTypesComponent,
      },
    ]
  }
];
