import { ApiService } from './../../../crud/api.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService2 } from '../../../@core/mock/smart-table2.service';
import { Avis } from '../../../crud/vendre';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  providers: [SmartTableService2],
})
export class SmartTableComponent implements OnInit {

  avis: Avis[];

  settings = {
    alarm_add: {
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
      date_avis: {
        title: 'Date',
        type: 'string',
      },
      cont_avis: {
        title: 'Contenu',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      sujet: {
        title: 'Sujet',
        type: 'string',
      },
      auteur: {
        title: 'Auteur',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data: any[];

  constructor(private service: ApiService) {
  }
  ngOnInit() {
    this.service.readAvis().subscribe((avi: Avis[]) => {
      this.avis = avi;
      this.data = Array.of(this.avis);
      this.source.load(this.data[0]);

    });
  }

  onDeleteConfirm(event): void {

    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      // this.service.deleteUsers().subscribe()
    } else {
      event.confirm.reject();
    }
  }
}
