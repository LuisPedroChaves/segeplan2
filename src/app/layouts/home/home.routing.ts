import { Routes } from "@angular/router";
// import { RoleGuard } from "src/app/core/auth/role.guard";
import { IndexComponent } from './pages/index/index.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'ideasBank',
        // canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE', 'ADMIN_ROLE']
        },
        loadChildren: () =>
          import('../../modules/idea-bank/idea-bank.module').then(
            (m) => m.IdeaBankModule
          ),
      },
      {
        path: 'sinafip',
        // canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE', 'ADMIN_ROLE', 'DIGITADOR_ROLE']
        },
        loadChildren: () =>
          import('../../modules/sinafip/sinafip.module').then(
            (m) => m.SinafipModule
          ),
      },
      {
        path: 'checkProjects',
        // canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE','ADMIN_ROLE', 'DIGITADOR_ROLE']
        },
        loadChildren: () =>
          import('../../modules/check-project/check-project.module').then(
            (m) => m.CheckProjectModule
          ),
      },
      {
        path: 'reports',
        // canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE','ADMIN_ROLE', 'DIGITADOR_ROLE']
        },
        loadChildren: () =>
          import('../../modules/report/report.module').then(
            (m) => m.ReportModule
          ),
      },
      {
        path: 'configs',
        // canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE','ADMIN_ROLE', 'DIGITADOR_ROLE']
        },
        loadChildren: () =>
          import('../../modules/config/config.module').then(
            (m) => m.ConfigModule
          ),
      },
    ]
  }
];
