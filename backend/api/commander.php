<?php
 /*
  * requiring the database (important)
  */
require 'database.php';
  /*
   * Déclaration des fonctions
   */

//fonction enregistrer vente
function commander($con){
  // Get the posted data.
  $postdata = file_get_contents("php://input");
  
  if(isset($postdata) && !empty($postdata))
  {
    // Extract the data.
    $request = json_decode($postdata,true);
    

    // Separate.
    $lieu=$request['lieu'];
    $produits=$request['produits'];
    $fournisseur=$request['fournisseur'];
    
    
    // Check if customer is registered.
    $frs = [];
    $nom=$fournisseur['FrsName'];
    $adress=$fournisseur['FrsAdress'];
    $contact=$fournisseur['FrsTel'];
    $mail=$fournisseur['FrsMail'];
    $sql = "SELECT * FROM `fournisseur` WHERE `nom_frs`='$nom'";

    if($result = mysqli_query($con,$sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        
        $frs[$i]['id'] = $row['id_frs'];
        $id = $row['id_frs'];
        $frs[$i]['nom'] = $row['nom_frs'];
        $frs[$i]['adresse'] = $row['adresse'];
        $frs[$i]['tel'] = $row['tel_frs'];
        $frs[$i]['mail'] = $row['mail_frs'];
        $i++;
      }

      if (count($frs)==0) {
        // Get id

        $sql = "SELECT COUNT(*) as pos  FROM `fournisseur`";
        $result = mysqli_query($con,$sql);
        // $result = mysqli_error($con);
        $id_frs = mysqli_fetch_assoc($result);
        $id=$id_frs['pos']+1;
  
        // Create fournisseur
        $sql = "INSERT INTO `fournisseur`(`id_frs`,`nom_frs`,`adresse`,`tel_frs`,`mail_frs`) VALUES ($id,'$nom','$adress','$contact','$mail')";
        $result = mysqli_query($con,$sql);

      }
      
    }
    
    //Gérer date
    $timezone1="Africa/Lome";
    $timezone2="Africa/Porto-Novo";
    date_default_timezone_set($timezone2);
    $times= time();

    // Enregistrer commande
    
    for ($t=0; $t < count($produits); $t++) { 
      $ref=$produits[$t]['ref'];
      $qte=$produits[$t]['qte'];
      $sql = "INSERT INTO `commande`(`id_frs`,`ref_prod`,`liv_cmd`,`qte_cmd`) 
      VALUES ('$id','$ref','$lieu','$qte')";
      $i++;
      if(mysqli_query($con,$sql))
      {
        http_response_code(201);
        json_encode($request);
        
      }
      else
      {
        http_response_code(200);
        echo mysqli_error($con);
        echo "pas enr";
      }
    }
  }
}
commander($con);