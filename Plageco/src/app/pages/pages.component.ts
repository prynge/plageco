import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbSidebarService, NbMenuService, NbThemeService, NbMediaBreakpointsService } from '@nebular/theme';
import { UserData } from '../@core/data/users';
import { LayoutService } from '../@core/utils';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  user= {};
  constructor(private authService: NbAuthService) {
      this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
      // tslint:disable-next-line: max-line-length
      this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
      }

    });
  }

  menu = MENU_ITEMS;
}
