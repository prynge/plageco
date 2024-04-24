export  class  Vendre {
  client: any;
  produits: any[];
  remise: any;
}

export class Produit {
  ref: string;
  lib: string;
  qte: number;
  puht: number;
  qte_stock: number;
}

export class NewProduit {
  ref: string;
  lib: string;
  qte: number;
  puht: number;
  qte_stock: number;
  seuil: number;
}

export class SimpleProduit {
  ref: string;
  lib: string;
  qte: number;
}

export class Client {
  pseudo: string;
  nom: string;
  prenom: string;
  contact: number;
  mail: string;
}

export class Users {
  id: number;
  pseudo: string;
  nom: string;
  prenom: string;
  Statut: string;
}

export class Avis {
  id: number;
  date_avis: string;
  cont_avis: string;
  type: string;
  sujet: string;
  auteur: string;
}
