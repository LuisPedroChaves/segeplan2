import { Routes } from "@angular/router";

import { IndexComponent } from './pages/index/index.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NewIdeasComponent } from "./pages/new-ideas/new-ideas.component";
import { SendIdeasComponent } from "./pages/send-ideas/send-ideas.component";
import { DoneIdeasComponent } from "./pages/done-ideas/done-ideas.component";
import { ResultIdeasComponent } from "./pages/result-ideas/result-ideas.component";
import { RoleGuard } from "src/app/core/auth/guards/role.guard";
import { RevelanceMatrixComponent } from "./pages/revelance-matrix/revelance-matrix.component";

export const IdeaRegistrationRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'newIdeas',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE']
        },
        component: NewIdeasComponent,
      },
      {
        path: 'sendIdeas',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['USER_ROLE', 'ADMIN_ROLE']
        },
        component: SendIdeasComponent
      },
      {
        path: 'doneIdeas',
        component: DoneIdeasComponent
      },
      {
        path: 'resultIdeas',
        component: ResultIdeasComponent
      },
      {
        path: 'revelanceMatrix',
        canActivate: [ RoleGuard ],
        data: {
          allowedRoles: ['ADMIN_ROLE']
        },
        component: RevelanceMatrixComponent
      },
    ]
  }
];
