export class Commander {
  fournisseur: any;
  produits: any[];
  lieu: any;
}

export class Produit {
  ref: string;
  lib: string;
  qte: number;
  puht: number;
  qte_stock: number;
}

export class SimpleProduit {
  ref: string;
  lib: string;
  qte: number;
}

export class Fournisseur {
  id: number;
  nom: string;
  adresse: string;
  tel: number;
  mail: string;
}

export class Livraison {
  lieu: string;
}
