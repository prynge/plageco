<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
/*
 * requiring the database (important)
 */
require 'database.php';
 /*
  * Déclaration des fonctions
  */
//fonction login
function login($id,$pass){
 $user = [];
 $sql = "SELECT `nom_user`,`prenom_user`,`statut` FROM utilisateur WHERE `id_users`=$id AND `pass_user`=$pass";

 if($result = mysqli_query($con,$sql))
 {
   while($row = mysqli_fetch_assoc($result))
   {
     $user['id']    = $id;
     $user['nom'] = $row['nom_user'];
     $user['prenom'] = $row['prenom_user'];
     $user['statut'] = $row['statut'];
   }

   echo json_encode($user);
 }
 else
 {
   http_response_code(404);
 }
}
