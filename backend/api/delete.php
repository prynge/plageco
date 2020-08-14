<?php
require 'database.php';
switch ($_GET['type']) {
  case "prod":
    /**
     * Returns the list of produits.
     */
    $produits = [];
    $sql = "SELECT produit.ref_prod,lib_prod,seuil,puht,qte_stock,date_enr FROM produit, prix_unitaire_produit as pu, quantite_produit as qp where produit.ref_prod=pu.ref_prod and date_fin IS null and id_qte in (SELECT MAX(id_qte) FROM quantite_produit qp WHERE produit.ref_prod=qp.ref_prod) ORDER BY date_enr";
    
    if($result = mysqli_query($con,$sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $produits[$i]['ref']    = $row['ref_prod'];
        $produits[$i]['lib'] = $row['lib_prod'];
        $produits[$i]['seuil'] = $row['seuil'];
        $produits[$i]['puht'] = $row['puht'];
        $produits[$i]['qte_stock'] = $row['qte_stock'];
        $i++;
      }
    
      echo json_encode($produits);
    }
    else
    {
      http_response_code(404);
    }
    break;
  case "inv":
    /**
     * Returns the list of produits.
     */
    $produits = [];
    $sql = "SELECT * from vendre,produits";
    
    if($result = mysqli_query($con,$sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $produits[$i]['ref']    = $row['ref_prod'];
        $produits[$i]['lib'] = $row['lib_prod'];
        $produits[$i]['seuil'] = $row['seuil'];
        $produits[$i]['puht'] = $row['puht'];
        $produits[$i]['qte_stock'] = $row['qte_stock'];
        $i++;
      }
    
      echo json_encode($produits);
    }
    else
    {
      http_response_code(404);
    }
    break;
  case 'avis':
    /**
     * Delete an avis.
     */
    $sql = "DELETE FROM `avis` WHERE `num_avis`='{$_GET['id']}' LIMIT 1";
    if(mysqli_query($con, $sql))
      {
        http_response_code(204);
      }
      else
      {
        echo $con -> error;
        return http_response_code(422);
      }
    break;
  case 'users':
    /**
     * Delete a user.
     */
     $table;
     if ($_GET['table']=='administrateur') {
       $table='utilisateur';
       $iduser='id_user';
      } elseif ($_GET['table']=='Client') {
        $table='client';
        $iduser='pseudo';
     }
    $sql = "DELETE FROM `{$table}` WHERE `{$iduser}`='{$_GET['id']}' LIMIT 1";
    if(mysqli_query($con, $sql))
      {
        http_response_code(204);
      }
      else
      {
        echo $con -> error;
        return http_response_code(422);
      }
    break;
}