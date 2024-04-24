import { Component, ViewContainerRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService2 } from '../../../@core/mock/smart-table2.service';
import { EditorsComponent } from '../commandes.component';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  providers: [SmartTableService2],
})
export class SmartTableComponent {
  prod = [];

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
        title: 'ID',
        type: 'number',
      },
      libellé: {
        title: 'Libellé',
        type: 'string',
      },
      quantité: {
        title: 'Quantité',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService2, private viewContainerRef: ViewContainerRef) {
  }
  add(produit: any) {
    this.prod.push(produit);
    this.source.load(this.prod);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer la ligne ?')) {
      event.confirm.resolve();
      for ( let i = 0; i < this.getParentComponent().prod.length; i++) {
        if (this.getParentComponent().prod[i].ref === event.data.id) {
          this.getParentComponent().prod.splice(i, 1);
          this.prod.splice(i, 1);
          return ;
        }
      }
    } else {
      event.confirm.reject();
    }
  }
  reset(){
    this.prod = [];
    this.source.load(this.prod);
  }
  getParentComponent(): EditorsComponent{
    // tslint:disable-next-line: max-line-length
    return this.viewContainerRef[ '_data' ].componentView.component.viewContainerRef[ '_view' ].component;
  }
}
