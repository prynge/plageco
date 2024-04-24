import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { of as observableOf,  Observable } from 'rxjs';

export interface User {
  pseudo: string;
  nom: string;
  prenom: string;
  statut: string;
}

export class UserData {
  user = {};
  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          // tslint:disable-next-line: max-line-length
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        }

      });
    }
    public getUserInfo(): Observable<any> {
      return observableOf(this.user);
    }
}
