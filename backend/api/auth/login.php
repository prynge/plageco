<?php
// Allow from any origin
if(isset($_SERVER["HTTP_ORIGIN"]))
{
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
else
{
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");    // cache for 10 minutes

if($_SERVER["REQUEST_METHOD"] == "OPTIONS")
{
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); //Make sure you remove those you do not want to support

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        //Just exit with 200 OK with the above headers for OPTIONS method
        //exit(0);
}

function debug_to_console($data) {
  $output = $data;
  if (is_array($output))
  $output = implode(',', $output);
  
  echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}

$postdata = file_get_contents("php://input");
/*
 * requiring the database (important)
 */
require 'database.php';
/*
* Déclaration des fonctions
*/
//fonction login
function login($val, $postdata){
  // Extract the data.
  $request = json_decode($postdata,true);
  $id=$request['pseudo'];
  $pass=md5(sha1($request['password'])).'Ktt';
  $user = [];
  $sql = "SELECT `nom_user`,`prenom_user`,`statut` FROM utilisateur WHERE `id_user`='$id' AND `pass_user`='$pass'";
  if($result = mysqli_query($val,$sql))
  {
    require_once('jwt.php');
    http_response_code(200);
    while($row = mysqli_fetch_assoc($result))
    {
      $user['id']    = $id;
      $user['nom'] = $row['nom_user'];
      $user['prenom'] = $row['prenom_user'];
      $user['statut'] = $row['statut'];
    }
     if (count($user)>=1) {
       // Get our server-side secret key from a secure location.
       $serverKey = '5f2b5cdbe5194f10b3241568fe4e2b24';
       $token = JWT::encode( $user, $serverKey);
       $returnArray = array('token' => $token);
       $jsonEncodedReturnArray = json_encode($returnArray, JSON_PRETTY_PRINT);
       echo $jsonEncodedReturnArray;  
     }
     else {
       
       $error= "Pseudo/Mot de passe invalide.";
       echo json_encode($error);
       http_response_code(200);
     }
    
  }
  else
  {
    $error['error']= "Pseudo/Mot de passe invalide.";
    echo json_encode($error);
    http_response_code(200);
    
  }
}
login($con,$postdata);