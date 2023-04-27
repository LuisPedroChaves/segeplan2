import { Routes } from "@angular/router";

import { IndexComponent } from './pages/index/index.component';
import { IdeaBankComponent } from "./pages/idea-bank/idea-bank.component";
import { SinafipComponent } from "./pages/sinafip/sinafip.component";
import { CheckProjectComponent } from "./pages/check-project/check-project.component";

export const ReportRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: IdeaBankComponent
      },
      {
        path: 'sinafip',
        component: SinafipComponent
      },
      {
        path: 'checkProjects',
        component: CheckProjectComponent
      }
    ]
  }
];
