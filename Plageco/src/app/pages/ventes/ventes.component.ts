import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../crud/api.service';
import { SimpleProduit, Produit, Client, Vendre } from '../../crud/vendre';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-charts',
  styleUrls: ['./ventes.component.scss'],
  templateUrl: './ventes.component.html',
})
export class ChartsComponent implements OnInit {
  clients: Client[];
  produits = [];
  prods: SimpleProduit[];
  prod: any = [];
  produit: any = [];
  cli: any = {};
  cl: any = {};
  pr: any = {};
  pro: any = {};
  mtb: number;
  mtn: number;
  tva: number;
  mttc: number;
  tpttc: number;
  remise: number = 0;
  taux: number = 0;
  disrmtt9: boolean;
  disrmTaux10: boolean;

  mainForm: FormGroup;
  nameForm: FormGroup;
  prodForm: FormGroup;
  orderLines= [];


 constructor(private apiService: ApiService) {
  this.mainForm = this.getForm();
  this.nameForm = this.getnameForm();
  this.prodForm = this.getprodForm();

  }

  getForm(): FormGroup {
    return new FormGroup({
      Option: new FormControl(),
      RmMtt: new FormControl(),
      RmTaux: new FormControl(),
      MtHt: new FormControl({value: '', disabled: true}),
      TVA: new FormControl({value: '', disabled: true}),
      MtTTC: new FormControl({value: '', disabled: true}),
    });
  }

 getnameForm(): FormGroup {
    return new FormGroup({
      CliName: new FormControl(),
      CliFirstName: new FormControl(),
      CliContact: new FormControl(),
    });
  }

  getprodForm(): FormGroup {
    return new FormGroup({
      ProdRef: new FormControl(),
      ProdLib: new FormControl({value: '', disabled: true}),
      ProdPUHT: new FormControl({value: '', disabled: true}),
      ProdStock: new FormControl({value: '', disabled: true}),
      ProdQte: new FormControl(),
    });
  }


  getFormGroupForLine(orderLine: any): FormGroup {
    return new FormGroup({
      Qte: new FormControl(orderLine.price),
    });
  }

  ngOnInit() {

   this.apiService.readClient().subscribe((clis: Client[]) => {
     this.clients = clis;
     // tslint:disable-next-line: no-console
      console.log(this.clients);
    });
    this.apiService.readProduit().subscribe((pro: SimpleProduit[]) => {
      this.prods = pro;
      // tslint:disable-next-line: no-console
      console.log(this.prods);
    });
  }

  remplir(cat) {
   if (cat === 'cli' ) {
     const ref = this.nameForm.get('CliName').value;
     this.apiService.selectClients(ref).subscribe((clis: Client[]) => {
       this.cl = clis[0];
       // tslint:disable-next-line: max-line-length
       this.nameForm.setValue({'CliName': this.cl.nom , 'CliFirstName': this.cl.prenom , 'CliContact': this.cl.tel });
      });
    } else if (cat === 'pro' ) {
      const ref = this.prodForm.get('ProdRef').value;
      this.apiService.selectProduit(ref).subscribe((pros: Produit[]) => {
        this.pr = pros[0];
        // tslint:disable-next-line: max-line-length
        this.prodForm.setValue({'ProdRef': this.pr.ref , 'ProdLib': this.pr.lib , 'ProdPUHT': this.pr.puht , 'ProdStock': this.pr.qte_stock , 'ProdQte': 1 });
       });
     }
  }

  disable() {
    this.mainForm.get('Option').valueChanges.subscribe(selectedOption => {
      if (selectedOption === 'Montant') {
        this.mainForm.get('RmTaux').disable();
        this.mainForm.get('RmMtt').enable();
      } else if (selectedOption === 'Taux') {
        this.mainForm.get('RmMtt').disable();
        this.mainForm.get('RmTaux').enable();
      }
    });
  }

  calculRemise() {
    const ttc = this.mttc;
    if (!this.mainForm.controls.RmMtt.disabled) {
      this.remise = (this.mainForm.controls.RmMtt.value === null) ? 0 : this.mainForm.controls.RmMtt.value;
      this.taux = (this.mainForm.controls.RmMtt.value * 100) / this.tpttc;
      this.mainForm.patchValue({'RmTaux': this.taux});
    }
    if (!this.mainForm.controls.RmTaux.disabled) {
      this.taux = (this.mainForm.controls.RmTaux.value === null) ? 0 : this.mainForm.controls.RmTaux.value;
      this.remise = (this.mainForm.controls.RmTaux.value * this.tpttc) / 100;
      this.mainForm.patchValue({'RmMtt': this.remise});
    }
    if (this.remise === 0 ) {
      this.mttc = this.tpttc;
    }else {
      this.mttc = this.tpttc - this.mainForm.controls.RmMtt.value;
    }
    this.mainForm.patchValue({'MtTTC': this.mttc});
  }

  calculMtTotal(produit) {
    this.mtb = 0;

    for (let index = 0; index < produit.length; index++) {
      this.mtb += produit[index].ProdPUHT * produit[index].ProdQte;
    }
    this.mtn = this.mtb;
    this.tva = (this.mtn * 18) / 100;
    this.mttc = this.mtn + this.tva;
    // tslint:disable-next-line: max-line-length
    this.mainForm.patchValue({ 'MtHt': this.mtn, 'TVA': this.tva, 'MtTTC': this.mttc });
    this.tpttc = this.mttc;
  }

  ajouter_bouton() {
    this.pro = this.prodForm.getRawValue();
    this.produit = {'id': this.pro.ProdRef, 'libellé': this.pro.ProdLib, 'quantité': this.pro.ProdQte};
    this.produits.push(this.pro);
    this.prod.push({'ref': this.pro.ProdRef, 'qte': this.pro.ProdQte});
    this.calculMtTotal(this.produits);
    this.prodForm.setValue({'ProdRef': '', 'ProdLib': '', 'ProdPUHT': '', 'ProdStock': '', 'ProdQte': ''});
  }

  vendre_produit() {
    this.cli = this.nameForm.value;
    const panier = { 'client': this.cli , 'produits': this.prod, 'remise': this.remise };

    this.apiService.vente(panier).subscribe(( vendu: Vendre) => {
      alert('Vente enregistrée');
      // tslint:disable-next-line: no-console
      console.log('Vente enregistrée, ', vendu);

    });
    this.mainForm.reset();
    this.nameForm.reset();
    this.prodForm.reset();
    this.cli = null;
    this.prod = null;
    this.remise = null;
    this.produit = null;
    this.ngOnInit();
  }

  /*
  {
    "client":{"nom":"TOGOCEL","prenom":"","contact":"90123456"},
    "produits":[
      {"ref":"PBA9050","qte":"3"},
      {"ref":"PBA9030","qte":"4"}
    ]
    "remise": 0
  }
  */
}
