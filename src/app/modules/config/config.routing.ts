import { Routes } from "@angular/router";
import { IndexComponent } from './pages/index/index.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DesignationsComponent } from './pages/designations/designations.component';
import { ReferencePopulationsComponent } from './pages/reference-populations/reference-populations.component';
import { FinancingsComponent } from './pages/financings/financings.component';
import { ProjectTypesComponent } from "./pages/project-types/project-types.component";
import { RoleGuard } from "src/app/core/auth/guards/role.guard";
import { RevelanceMatrixComponent } from "./pages/revelance-matrix/revelance-matrix.component";
import { AdmitionMatrixComponent } from "./pages/admition-matrix/admition-matrix.component";

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
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['ADMIN_ROLE']
        },
        component: DesignationsComponent,
      },
      {
        path: 'referencePopulations',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['ADMIN_ROLE']
        },
        component: ReferencePopulationsComponent,
      },
      {
        path: 'financings',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['ADMIN_ROLE']
        },
        component: FinancingsComponent,
      },
      {
        path: 'projectTypes',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['ADMIN_ROLE']
        },
        component: ProjectTypesComponent,
      },
      {
        path: 'revelanceMatrix',
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['ADMIN_ROLE']
        },
        component: RevelanceMatrixComponent
      },
      {
        path: 'admitionMatrix',
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['ADMIN_ROLE']
        },
        component: AdmitionMatrixComponent
      },
    ]
  }
];
