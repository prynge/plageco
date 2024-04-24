import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

import {
  NgxLoginComponent,
} from './auth/login/login.component';

import { AuthGuard } from './auth-guard.service';
import { NgxLogoutComponent } from './auth/logout/logout.component';


const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NgxLoginComponent,
      },
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'logout',
        component: NgxLogoutComponent,
      },
    ],
  },

  { path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  { path: '*',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  { path: '**',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
