<?php
/**
 * This file regroup all the functions using the database.
 */


 /*
  * requiring the database (important)
  */
require 'database.php';
  /*
   * Déclaration des fonctions
   */

//fonction enregistrer vente
function vendre(){
  echo "ok";
  // Get the posted data.
  $postdata = file_get_contents("php://input");

  if(isset($postdata) && !empty($postdata))
  {
    // Extract the data.
    $request = json_decode($postdata);


    // Separate.
    $client=$request['client'];
    $produits=$request['produits'];
    $vente=$request['vente'];

    // Check if customer is registered.
    $customer = [];
    $sql = "SELECT * FROM `client` WHERE `nom_cli`=$client->CliName AND `prenom_cli`=$client->CliFirstName";

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

      echo json_encode($customer);
    }
    else
    {
      // Create user
      $pass= "PlageC01";
      $pseudo = substr($client->CliName,0,2)."_".substr($client->CliFirstName,0,2);
      $sql = "INSERT INTO `client`(`pseudo`,`nom_cli`,`prenom_cli`,`pass_cli`,`tel_cli`) VALUES ($pseudo,'$client->CliName','$client->CliFirstName','$pass','$client->CliContact')";
    }

    //Gérer date
    $timezone1="Africa/Lome";
    $timezone2="Africa/Porto-Novo";
    date_default_timezone_set($timezone2);
    $date=date();

    //Gérer produits
    $ref=$produits['ref'];
    $qte=$produits['qte'];

    // Enregistrer vente
    $sql = "INSERT INTO `vendre`(`ref_prod`,`pseudo`,`date_vente`,`qte`) VALUES ('$ref','$pseudo','$date','$qte')";

    foreach ($prod as list($ref, $qte)) {
      if(mysqli_query($con,$sql))
      {
        echo "enr";
        http_response_code(201);
      }
      else
      {
        echo "pas enr";
        http_response_code(422);
      }
    }
  }
}
vendre();