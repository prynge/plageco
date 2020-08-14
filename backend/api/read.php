<?php
require 'database.php';
switch ($_GET['type']) {
  case 'prod':
    /**
     * Returns the list of produits.
     */
    if (!isset($_GET['id'])){
      $produits = [];
      $sql = "SELECT * FROM produit";
      if($result = mysqli_query($con,$sql))
      {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
          $produits[$i]['ref']    = $row['ref_prod'];
          $produits[$i]['lib'] = $row['lib_prod'];
          $produits[$i]['seuil'] = $row['seuil'];
          $i++;
        }
      
        echo json_encode($produits);
      }
      else
      {
        http_response_code(404);
      }
    } else {
      $id=$_GET['id'];
      $produits = [];
      $sql = "SELECT produit.ref_prod,lib_prod,seuil,puht,qte_stock,date_enr FROM produit, prix_unitaire_produit as pu, quantite_produit as qp where produit.ref_prod=pu.ref_prod AND produit.ref_prod='$id' and date_fin IS null and id_qte in (SELECT MAX(id_qte) FROM quantite_produit qp WHERE produit.ref_prod=qp.ref_prod) ORDER BY date_enr";
      
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
          
        }
      
        echo json_encode($produits);
      }
      else
      {
        http_response_code(404);
      }
    }
    break;

  case 'inv':
    /**
     * Returns the inventory.
     */
    $inventories = [];
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
    
  case 'cli':
    /**
     * Returns the list of clients.
     */
     if (!isset($_GET['id'])) {
       $clients = [];
       $sql = "SELECT * FROM client";
       
       if($result = mysqli_query($con,$sql))
       {
         $i = 0;
         while($row = mysqli_fetch_assoc($result))
         {
           $clients[$i]['pseudo']    = $row['pseudo'];
           $clients[$i]['nom'] = $row['nom_cli'];
           $clients[$i]['prenom'] = $row['prenom_cli'];
           $clients[$i]['tel'] = $row['tel_cli'];
           $clients[$i]['mail'] = $row['mail_cli'];
           $i++;
          }
          
          echo json_encode($clients);
        }
        else
        {
          http_response_code(404);
        }
      }
      else
      {
       $id=$_GET['id'];
       $clients = [];
       $sql = "SELECT * FROM client WHERE `pseudo` ='$id'";
       
       if($result = mysqli_query($con,$sql))
       {
         $i = 0;
         while($row = mysqli_fetch_assoc($result))
         {
           $clients[$i]['pseudo']    = $row['pseudo'];
           $clients[$i]['nom'] = $row['nom_cli'];
           $clients[$i]['prenom'] = $row['prenom_cli'];
           $clients[$i]['tel'] = $row['tel_cli'];
           $clients[$i]['mail'] = $row['mail_cli'];
           $i++;
          }
          
          echo json_encode($clients);
        }
        else
        {
          http_response_code(404);
        }
      }
    break;

  case 'frs':
    /**
     * Returns the list of fournisseurs.
     */
     if (!isset($_GET['id'])) {
       $clients = [];
       $sql = "SELECT * FROM fournisseur";
       
       if($result = mysqli_query($con,$sql))
       {
         $i = 0;
         while($row = mysqli_fetch_assoc($result))
         {
           $fournisseurs[$i]['id']    = $row['id_frs'];
           $fournisseurs[$i]['nom'] = $row['nom_frs'];
           $fournisseurs[$i]['adresse'] = $row['adresse'];
           $fournisseurs[$i]['tel'] = $row['tel_frs'];
           $fournisseurs[$i]['mail'] = $row['mail_frs'];
           $i++;
          }
          
          echo json_encode($fournisseurs);
        }
        else
        {
          http_response_code(404);
        }
      }
      else
      {
       $id=$_GET['id'];
       $clients = [];
       $sql = "SELECT * FROM fournisseur WHERE `id_frs` ='$id'";
       
       if($result = mysqli_query($con,$sql))
       {
         $i = 0;
         while($row = mysqli_fetch_assoc($result))
         {
           $fournisseurs[$i]['id']    = $row['id_frs'];
           $fournisseurs[$i]['nom'] = $row['nom_frs'];
           $fournisseurs[$i]['adresse'] = $row['adresse'];
           $fournisseurs[$i]['tel'] = $row['tel_frs'];
           $fournisseurs[$i]['mail'] = $row['mail_frs'];
           $i++;
          }
          
          echo json_encode($fournisseurs);
        }
        else
        {
          http_response_code(404);
        }
      }
    break;

  case 'avis':
    /**
     * Returns the list of avis.
     */
    $clients = [];
    $sql = "SELECT * FROM avis, client, creer where client.pseudo=creer.pseudo and avis.num_avis=creer.num_avis ";
    
    if($result = mysqli_query($con,$sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $clients[$i]['id']    = $row['num_avis'];
        $clients[$i]['date_avis']    = $row['date_avis'];
        $clients[$i]['cont_avis'] = $row['cont_avis'];
        $clients[$i]['type'] = $row['type'];
        $clients[$i]['sujet'] = $row['sujet'];
        $clients[$i]['Auteur'] = $row['nom_cli']." ".$row['prenom_cli'];
        $i++;
      }
    
      echo json_encode($clients);
    }
    else
    {
      http_response_code(404);
    }
    break;

  case 'users':
    /**
     * Returns the list of users.
     */
    $users = [];
    $sql = "SELECT * FROM utilisateur";
    
    if($result = mysqli_query($con,$sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $users[$i]['id']    = $i;
        $users[$i]['nom'] = $row['nom_user'];
        $users[$i]['prenom'] = $row['prenom_user'];
        $users[$i]['pseudo']    = $row['id_user'];
        $users[$i]['statut'] = $row['statut'];
        
        $i++;
      }
      $sql = "SELECT * FROM client";
      $result = mysqli_query($con,$sql);
      while($row = mysqli_fetch_assoc($result))
      {
        $users[$i]['id']    = $i;
        $users[$i]['nom'] = $row['nom_cli'];
        $users[$i]['prenom'] = $row['prenom_cli'];
        $users[$i]['pseudo']    = $row['pseudo'];
        $users[$i]['statut'] = "Client";
        
        $i++;
      }

      echo json_encode($users);
    }
    else
    {
      http_response_code(404);
    }
    break;
  
  case 'liv':
    /**
     * Returns the list of liv_cmd.
     */
    $lieu = [];
    $sql = "SELECT Distinct liv_cmd FROM commande";
    
    if($result = mysqli_query($con,$sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        
        $users[$i]['lieu'] = $row['liv_cmd'];
        
        $i++;
      }
      echo json_encode($users);
    }
    else
    {
      http_response_code(404);
    }
    break;
}