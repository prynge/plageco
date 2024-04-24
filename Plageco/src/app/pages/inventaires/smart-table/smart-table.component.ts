import { Inventaire } from './../../../crud/inventaires';
import { ApiService } from './../../../crud/api.service';
import { Component} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';




@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  invent: Inventaire[];

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'N°',
        type: 'number',
      },
      date: {
        title: 'Date',
        type: 'string',
      },
      ventes: {
        title: 'Ventes',
        type: 'number',
      },
    },
  };

  prod =[];
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ApiService) {}


  add(produit: any) {
    this.prod.push(produit);
    this.source.load(this.prod);
  }

  reset() {
    this.prod = [];
    this.source.load(this.prod);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer la ligne ?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
