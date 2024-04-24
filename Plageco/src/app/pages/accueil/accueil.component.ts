import { Component } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'ngx-modal-overlays',
  styleUrls: ['./accueil.component.scss'],
  templateUrl: './accueil.component.html',
})

export class AccueilComponent {
  user= {'nom': '', 'prenom': '', 'statut': '' };
  constructor(private authService: NbAuthService) {
      this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
      // tslint:disable-next-line: max-line-length
      this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
      }

    });
  }
  date = new Date;
  jour= this.date.getDate();
  mois= this.date.getMonth() + 1;
  annee= this.date.getFullYear();

}
