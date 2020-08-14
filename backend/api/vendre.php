<?php
 /*
  * requiring the database (important)
  */
require 'database.php';
  /*
   * Déclaration des fonctions
   */

//fonction enregistrer vente
function vendre($con){
  // Get the posted data.
  $postdata = file_get_contents("php://input");
  
  if(isset($postdata) && !empty($postdata))
  {
    // Extract the data.
    $request = json_decode($postdata,true);
    

    // Separate.
    $client=$request['client'];
    $produits=$request['produits'];
    //$vente=$request['vente'];
    
    // Check if customer is registered.
    $customer = [];
    $pseudo;
    $nom=$client['CliName'];
    $prenom=$client['CliFirstName'];
    $contact=$client['CliContact'];
    $sql = "SELECT * FROM `client` WHERE `nom_cli`='$nom' AND `prenom_cli`='$prenom'";

    if($result = mysqli_query($con,$sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $customer[$i]['pseudo']    = $row['pseudo'];
        $pseudo   = $row['pseudo'];
        $customer[$i]['nom'] = $row['nom_cli'];
        $customer[$i]['prenom'] = $row['prenom_cli'];
        $customer[$i]['tel'] = $row['tel_cli'];
        $customer[$i]['mail'] = $row['mail_cli'];
        $i++;
      }
      if (count($customer)==0) {
        // Create user
        $pass= "PlageC01";
        if (empty($prenom)) {
          $pseudo=$nom;
        }else {
          $pseudo = substr($nom,0,3)."_".substr($prenom,0,3);
        }
        $sql = "INSERT INTO `client`(`pseudo`,`nom_cli`,`prenom_cli`,`pass_cli`,`tel_cli`) VALUES ('$pseudo','$nom','$prenom','$pass','$contact')";
        $result = mysqli_query($con,$sql);
      }
      
    }else {
    }
    
    //Gérer date
    $timezone1="Africa/Lome";
    $timezone2="Africa/Porto-Novo";
    date_default_timezone_set($timezone2);
    $times= time();
    //$date=date();
    
    
    
    // Enregistrer vente
   /* echo "ok";
    echo '<br>';
    print_r($produits);
    echo '<br>';
    $i=0;
    foreach ($produits as list($ref, $qte)) {
      //Gérer produits
      //$ref=$produits['ref'];
      //$qte=$produits['qte'];
      echo $ref." & ".$qte;
      $sql = "INSERT INTO `vendre`(`ref_prod`,`pseudo`,`qte`) VALUES ('$ref','$pseudo','$qte')";
      $i++;
      if(mysqli_query($con,$sql))
      {
        echo $i."enr";
        http_response_code(201);
      }
      else
      {
        echo $i."pas enr";
        http_response_code(200);
        echo mysqli_error($con);
      }
    }*/
    
    
    // Enregistrer vente2
    
    for ($t=0; $t < count($produits); $t++) { 
      $ref=$produits[$t]['ref'];
      $qte=$produits[$t]['qte'];
      $sql = "INSERT INTO `vendre`(`ref_prod`,`pseudo`,`qte`) VALUES ('$ref','$pseudo','$qte')";
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
      }
    }
  }
}
vendre($con);