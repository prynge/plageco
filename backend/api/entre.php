<?php
 /*
  * requiring the database (important)
  */
require 'database.php';
  /*
   * Déclaration des fonctions
   */

//fonction enregistrer vente
function entrer($con){
  // Get the posted data.
  $postdata = file_get_contents("php://input");
  
  if(isset($postdata) && !empty($postdata))
  {
    // Extract the data.
    $request = json_decode($postdata,true);
    

    // Separate.
    /*$lieu=$request['lieu'];
    $produits=$request['produits'];
    $fournisseur=$request['fournisseur'];*/
    
    
    $produits = [];
    $ref=$request['ref'];
    $lib=$request['lib'];
    $puht=$request['puht'];
    $stk=$request['qte_stock'];
    $seuil=$request['seuil'];
    $qte=$request['qte'];
    // Check if prod exist.
    $sql = "SELECT * FROM `produit` WHERE `ref_prod`='$ref'";

    if($result = mysqli_query($con,$sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $produits[$i]['ref'] = $row['ref_prod'];
        $produits[$i]['lib'] = $row['lib_prod'];
        $produits[$i]['seuil'] = $row['seuil'];
        $i++;
      }

      if (count($produits)==0) {
        // Create produit
        $sql = "INSERT INTO `produit`(`ref_prod`,`lib_prod`,`seuil`) VALUES ('$ref','$lib','$seuil')";
        $result = mysqli_query($con,$sql);
        echo $result;
        echo mysqli_error($con);
      }
      
    }else {
      //echo mysqli_error($con);
    }
    
    /*
    UPDATE `prix_unitaire_produit` SET `date_fin` = CURRENT_TIME() WHERE `date_fin`=null AND `prix_unitaire_produit`.`ref_prod` = (SELECT `prix_unitaire_produit`.`ref_prod` FROM `prix_unitaire_produit` ORDER BY `ref_prod` DESC LIMIT 0)

    SELECT @ref:= `prix_unitaire_produit`.`ref_prod` FROM `prix_unitaire_produit` ORDER BY `ref_prod` DESC LIMIT 1;
UPDATE `prix_unitaire_produit` SET `date_fin` = CURRENT_TIME() WHERE `date_fin`=null AND `prix_unitaire_produit`.`ref_prod` = @ref;
    */
    //Gérer date
    $timezone1="Africa/Lome";
    $timezone2="Africa/Porto-Novo";
    date_default_timezone_set($timezone2);
    $times= time();

    // Update 
    
    // Create PUHT
    $sql1 = "UPDATE `prix_unitaire_produit` SET `date_fin` = CURRENT_TIME() WHERE `date_fin`=null AND `prix_unitaire_produit`.`ref_prod` = '$ref'";
    
    $sql3 = "INSERT INTO `prix_unitaire_produit`(`puht`,`ref_prod`) VALUES ($puht,'$ref')";
    

    // Create quantite
    $sql2 = "INSERT INTO `quantite_produit`(`qte_stock`,`qte_entr`, `ref_prod`) VALUES ($stk+$qte,'$qte', $ref)";
    

    if(mysqli_query($con,$sql3) && mysqli_query($con,$sql1) && mysqli_query($con,$sql2))
    {
      http_response_code(201);
      echo json_encode($request);
    }
    else
    {
      http_response_code(200);
      echo mysqli_error($con);
      echo "pas enr";
    }
  }
}
entrer($con);