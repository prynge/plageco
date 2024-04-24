import { Inventaire } from './../../crud/inventaires';
import { Component } from '@angular/core';

import { ApiService } from '../../crud/api.service';

@Component({
  selector: 'ngx-tables',
  styleUrls: ['./inventaires.component.scss'],
  templateUrl: './inventaires.component.html',
})
export class TablesComponent {
  inventaires: Inventaire[];


  constructor(private apiService: ApiService) {}


  inventorier(deb, fin){
    this.apiService.readInventaire(deb, fin).subscribe((clis: Inventaire[]) => {
      this.inventaires = clis;
      // tslint:disable-next-line: no-console
       console.log(this.inventaires);
     });
  }

  show(de){
    const timend=de.queue.end.getTime();
    console.log(de.queue);
    console.log(de.queue.start);
    console.log(de.queue.end);
    console.log(timend);


  }
}
