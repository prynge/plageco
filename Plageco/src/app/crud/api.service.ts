import { Commander, Fournisseur, Livraison } from './commander';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Produit, SimpleProduit, Client, Vendre, Users, Avis, NewProduit} from './vendre';
import {  of as observableOf, Observable } from 'rxjs';
import { Inventaire } from './inventaires';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  PHP_API_SERVER = 'http://127.0.0.1:8000/edsa-Plageco/api';
  constructor(private httpClient: HttpClient) {}
  cli= {};
  prod= {};

  // Vendre
  vente(vendre: Vendre): Observable<Vendre> {
    return this.httpClient.post<Vendre>(`${this.PHP_API_SERVER}/vendre.php`, vendre);
  }

  // Entrée
  entree(vendre: NewProduit): Observable<NewProduit> {
    return this.httpClient.post<NewProduit>(`${this.PHP_API_SERVER}/entre.php`, vendre);
  }

  readNewProduit(): Observable<NewProduit[]>{
    return this.httpClient.get<NewProduit[]>(`${this.PHP_API_SERVER}/read.php?type=prod`);
  }

  // Livraison
  readLivraison(): Observable<Livraison[]> {
    return this.httpClient.get<Livraison[]>(`${this.PHP_API_SERVER}/read.php?type=liv`);
  }

  // Commander
  commande(commande: Commander): Observable<Commander> {
    return this.httpClient.post<Commander>(`${this.PHP_API_SERVER}/commander.php`, commande);
  }

  // Clients
  readClient(): Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${this.PHP_API_SERVER}/read.php?type=cli`);
  }

  selectClients(pseudo: string): Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${this.PHP_API_SERVER}/read.php?type=cli&id=${pseudo}`);
  }

  // Fournisseurs
  readFournisseur(): Observable<Fournisseur[]>{
    return this.httpClient.get<Fournisseur[]>(`${this.PHP_API_SERVER}/read.php?type=frs`);
  }

  selectFournisseurs(id: number): Observable<Fournisseur[]>{
    return this.httpClient.get<Fournisseur[]>(`${this.PHP_API_SERVER}/read.php?type=frs&id=${id}`);
  }

  // Produits
  readProduit(): Observable<SimpleProduit[]>{
    return this.httpClient.get<SimpleProduit[]>(`${this.PHP_API_SERVER}/read.php?type=prod`);
  }

  selectProduit(ref: string): Observable<Produit[]>{
    return this.httpClient.get<Produit[]>(`${this.PHP_API_SERVER}/read.php?type=prod&id=${ref}`);
  }

  // Users
  readUsers(): Observable<Users[]>{
    return this.httpClient.get<Users[]>(`${this.PHP_API_SERVER}/read.php?type=users`);
  }

  deleteUsers(id: string, tab:string){
    return this.httpClient.delete<Users[]>(`${this.PHP_API_SERVER}/delete.php/?type=users&id=${id}&table=${tab}`);
  }

  // Inventaire
  readInventaire(deb, fin): Observable<Inventaire[]>{
    return this.httpClient.get<Inventaire[]>(`${this.PHP_API_SERVER}/read.php?type=inv&bed=${deb}&nif=${fin}`);
  }

  // Avis
  readAvis(): Observable<Avis[]>{
    return this.httpClient.get<Avis[]>(`${this.PHP_API_SERVER}/read.php?type=avis`);
  }

  deleteAvis(id: string){
    return this.httpClient.delete<Users[]>(`${this.PHP_API_SERVER}/delete.php/?type=avis&id=${id}`);
  }

  /*
  getClient(): Observable<any> {
    return observableOf(this.cli);
  }

  getProduit(): Observable<any> {
    return observableOf(this.prod);
  }
  */
}

