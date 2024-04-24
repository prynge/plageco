import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS, NbAuthResult, getDeepFromObject } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router) {

  super(service, options, cd, router);
  this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
  this.showMessages = this.getConfigValue('forms.login.showMessages');
  this.strategy = this.getConfigValue('forms.login.strategy');
  this.rememberMe = this.getConfigValue('forms.login.rememberMe');
}

login(): void {
this.errors = [];
this.messages = [];
this.submitted = true;

this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
  this.submitted = false;

  if (result.isSuccess()) {
    this.messages = result.getMessages();
    } else {
      this.errors = result.getErrors();
    }

    const redirect = result.getRedirect();
    if (redirect) {
      setTimeout(() => {
        return this.router.navigateByUrl(redirect);
      }, this.redirectDelay);
    }
    this.cd.detectChanges();
  });
}

getConfigValue(key: string): any {
  return getDeepFromObject(this.options, key, null);
}

}
