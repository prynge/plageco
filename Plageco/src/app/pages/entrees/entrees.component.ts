import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../crud/api.service';
import { SimpleProduit, Produit, NewProduit } from '../../crud/vendre';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-components',
  styleUrls: ['./entrees.component.scss'],
  templateUrl: './entrees.component.html',
})
export class ExtraComponentsComponent implements  OnInit {
  mainForm: FormGroup;
  pr: any = {};
  pro: any = {};
  prods: SimpleProduit[];
  constructor(private apiService: ApiService) {
    this.mainForm = this.getForm();
  }

  getForm(): FormGroup {
    return new FormGroup({
      ProdRef: new FormControl(),
      ProdLib: new FormControl(),
      ProdPUHT: new FormControl(),
      ProdStock: new FormControl({value: ``, disabled: true }),
      ProdQte: new FormControl(),
      ProdSeuil: new FormControl({value: ``, disabled: true }),
    });
  }

  remplir() {
    const ref = this.mainForm.get('ProdRef').value;
    this.apiService.selectProduit(ref).subscribe((pros: NewProduit[]) => {
      this.pr = pros[0];
      // tslint:disable-next-line: max-line-length
      this.mainForm.setValue({'ProdRef': this.pr.ref , 'ProdLib': this.pr.lib , 'ProdPUHT': this.pr.puht , 'ProdStock': this.pr.qte_stock , 'ProdQte': 1 , 'ProdSeuil': this.pr.seuil});
    });
  }

  ngOnInit() {
     this.apiService.readProduit().subscribe((pro: SimpleProduit[]) => {
       this.prods = pro;
       // tslint:disable-next-line: no-console
       console.log(this.prods);
     });
   }

   ajouter() {
     console.log(this.mainForm);
     if (this.mainForm.controls.ProdStock.value === '') {
       this.mainForm.patchValue({'ProdStock': 0}) ;
       this.mainForm.value.ProdStock = 0 ;
      }
      this.pro = this.mainForm.value;
    // tslint:disable-next-line: max-line-length
    const panier = { 'ref': this.pro.ProdRef , 'lib': this.pro.ProdLib, 'qte': this.pro.ProdQte, 'puht': this.pro.ProdPUHT, 'qte_stock': this.pro.ProdStock, 'seuil': this.pro.ProdSeuil };
      console.log(this.mainForm);
      console.log(panier);
    this.apiService.entree(panier).subscribe(( vendu: Produit) => {
      alert('Vente enregistrée');
      // tslint:disable-next-line: no-console
      console.log('Vente enregistrée, ', vendu);

    });
    // this.mainForm.reset();
    this.pr = null;
    this.pro = null;
    this.ngOnInit();

  }
}
