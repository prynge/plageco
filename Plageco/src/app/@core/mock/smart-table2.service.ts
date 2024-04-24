import { Injectable } from '@angular/core';
import { SmartTableData2 } from '../data/smart-table2';

@Injectable()
export class SmartTableService2 extends SmartTableData2 {

  data = [{
    id: 1,
    date: 'lib',
    ventes: '',

  },
{
  id: 2,
  libellé: 'lib2',
  quantité: '4',
}];

  getData() {
    return this.data;
  }
}
