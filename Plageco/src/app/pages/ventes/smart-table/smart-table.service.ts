import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableService2 {

  data = [{
    id: 1,
    libellé: '',
    quantité: '',

  }];

  getData() {
    return this.data;
  }
}
