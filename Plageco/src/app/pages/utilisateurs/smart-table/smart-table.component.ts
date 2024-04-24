import { Users } from './../../../crud/vendre';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';


import { ApiService } from '../../../crud/api.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {

  users: Users[];
  data;
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
      nom: {
        title: 'Nom',
        type: 'string',
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
      },
      pseudo: {
        title: 'Pseudo',
        type: 'string',
      },
      statut: {
        title: 'Statut',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.service.readUsers().subscribe((uses: Users[]) => {
      this.users = uses;
      this.data = Array.of(this.users);
      this.source.load(this.data[0]);

    });
  }


  onDeleteConfirm(event): void {
    // tslint:disable-next-line: no-console
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.service.deleteUsers(event.data.pseudo, event.data.statut).subscribe((uses: Users[])=>{
        // tslint:disable-next-line: no-console
        console.log('User deleted, ', uses);
      });
    } else {
      event.confirm.reject();
    }
  }
}
