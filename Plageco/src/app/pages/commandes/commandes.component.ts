import { Livraison } from './../../crud/commander';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../crud/api.service';
import { Commander, SimpleProduit, Produit, Fournisseur } from '../../crud/commander';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-editors',
  styleUrls: ['./commandes.component.scss'],
  templateUrl: './commandes.component.html',
})
export class EditorsComponent implements OnInit {
  produits = [];
  prods: SimpleProduit[];
  prod: any = [];
  produit: any = [];
  pr: any = {};
  fr: any = {};
  pro: any = {};
  lieu: any;
  frs: any = {};
  frss: Fournisseur[];
  livs: Livraison[];

  mainForm: FormGroup;
  prodForm: FormGroup;
  frsForm: FormGroup;


  constructor(private apiService: ApiService) {
    this.mainForm = this.getForm();
    this.prodForm = this.getprodForm();
    this.frsForm = this.getfrsForm();

  }

  getForm(): FormGroup {
    return new FormGroup({
      LivLieu: new FormControl(),
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

  getfrsForm(): FormGroup {
    return new FormGroup({
      FrsName: new FormControl(),
      FrsAdress: new FormControl(),
      FrsTel: new FormControl(),
      FrsMail: new FormControl(),

    });
  }

  ngOnInit() {
    this.apiService.readLivraison().subscribe((liv: Livraison[]) => {
      this.livs = liv;
      // tslint:disable-next-line: no-console
      console.log(this.frss);
    });
    this.apiService.readFournisseur().subscribe((frs: Fournisseur[]) => {
      this.frss = frs;
      // tslint:disable-next-line: no-console
      console.log(this.frss);
    });
    this.apiService.readProduit().subscribe((pro: SimpleProduit[]) => {
      this.prods = pro;
      // tslint:disable-next-line: no-console
      console.log(this.prods);
    });
  }

  remplir(cat) {
    if (cat === 'frs' ) {
      const ref = this.frsForm.get('FrsName').value;
      this.apiService.selectFournisseurs(ref).subscribe((frs: Fournisseur[]) => {
        this.fr = frs[0];
        console.log(this.fr);

        // tslint:disable-next-line: max-line-length
        this.frsForm.setValue({'FrsName': this.fr.nom , 'FrsAdress': this.fr.adresse , 'FrsTel': this.fr.tel, 'FrsMail': this.fr.mail });
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

  ajouter_bouton() {
    this.pro = this.prodForm.getRawValue();
    this.produit = {'id': this.pro.ProdRef, 'libellé': this.pro.ProdLib, 'quantité': this.pro.ProdQte};
    this.produits.push(this.pro);
    this.prod.push({'ref': this.pro.ProdRef, 'qte': this.pro.ProdQte});
    this.prodForm.setValue({'ProdRef': '', 'ProdLib': '', 'ProdPUHT': '', 'ProdStock': '', 'ProdQte': ''});
  }

  commander_produit() {
    this.frs = this.frsForm.value;
    this.lieu = this.mainForm.controls.LivLieu.value;
    const panier = { 'fournisseur': this.frs, 'produits': this.prod, 'lieu': this.lieu };
    this.apiService.commande(panier).subscribe(( comm: Commander) => {
      alert('Vente enregistrée');
      this.mainForm.reset();
      this.frsForm.reset();
      this.prodForm.reset();
      this.prod = [];
      this.produit = [];

      // tslint:disable-next-line: no-console
      console.log('Vente enregistrée, ', comm);
    });

  }

  /*
  {
    "fournisseur": {"FrsName":"satellite", "FrsAdress":"Parakou","FrsTel":"12345678","FrsMail":"mail@mail.com"}
    "produits":[
      {"ref":"PBA9050","lib":"pile...","qte":"3"},
      {"ref":"PBA9030","lib":"pile...","qte":"4"}
    ]
    "Lieu": "adresse"
  }
  */
}
