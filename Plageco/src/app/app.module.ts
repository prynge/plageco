/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
// tslint:disable-next-line: max-line-length
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthSimpleToken, NbAuthJWTToken, NbTokenStorage, NbTokenLocalStorage } from '@nebular/auth';
import { NgxAuthModule } from './auth/auth.module';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxAuthModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
              name: 'pseudo',
              baseEndpoint: 'http://127.0.0.1:8000/edsa-Plageco/api/auth',
              login: {
                endpoint: '/login.php',
                method: 'post',
                defaultErrors: ['La combinaison Pseudo/Mot de passe est invalide.'],
                defaultMessages: ['Vous êtes bien connectés.'],
                redirect: {
                  success: '/pages/accueil',
                  failure: null, // stay on the same page
                },
              },
              logout: {
                endpoint: '/logout.php',
                method: 'post',
                redirect: {
                  success: '/pages/accueil',
                  failure: null, // stay on the same page
                },
              },
              token: {
                class: NbAuthJWTToken,
                key: 'token', // this parameter tells where to look for the token
              },
           }),
         ],
         forms: {
           login: {
            // tslint:disable-next-line: max-line-length
            redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
            strategy: 'pseudo',  // strategy id key.
            showMessages: {     // show/not show success/error messages
              success: true,
              error: true,
            },
          },
          logout: {
            redirectDelay: 500,
            strategy: 'pseudo',
          },
          validation: {
            password: {
              required: true,
              minLength: 4,
              maxLength: 50,
            },
            pseudo: {
              required: true,
            },
            fullName: {
              required: false,
              minLength: 4,
              maxLength: 50,
            },
          },
         },
       }),
  ],
  bootstrap: [AppComponent],
  providers: [
    // ...
    AuthGuard,
  ],
})
export class AppModule {
}
