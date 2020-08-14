
<!DOCTYPE html>
<html>
<head>
	<title>Authentification</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
			<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css.map">
			<link rel="stylesheet" type="text/css" href="css/bootstrap-reboot.min.css">
			<link rel="stylesheet" type="text/css" href="css/bootstrap-reboot.min.css.map">
			<link rel="stylesheet" type="text/css" href="css/bootstrap-grid.min.css">
			<link rel="stylesheet" type="text/css" href="css/bootstrap-grid.min.css.map">
			<link rel="stylesheet" type="text/css" href="css/style.css">
			<meta charset="utf-8">
	</head>
<body>
				<?php
					session_start();
				
				if (isset($_GET['bouton_avis']) && $_GET['bouton_avis']=='Envoyer') {
					$_SESSION['cont_avis']= $_GET['cont_avis'];
				 	$_SESSION['type']= $_GET['type'];
				 	$_SESSION['sujet'] = $_GET['sujet'];
				 }
				?>

	<div class="container">
                  

					<form action= "enreg.php" method="GET">
						<fieldset>
							
						<center><legend>Authentifier vous pour envoyer votre message :</legend>	</center>

						<p>
						<label for="pseudo" >Pseudonyme&nbsp</label> 
						<input type="text" name="pseudo" id="pseudo" placeholder="pseudo" required>
						</p>
						<label for="pass_cli"> Mot de passe</label>
						<input type="password" name="pass_cli" id="pass_cli" placeholder="password" required>
						<p></p>
						<center><input  type="submit" name="bouton_enreg" value="Valider"  /></center><br/>
						</fieldset>
					</form>



		     <?php // Connexion à la base de données 
				 try 
				 { 
				 	$bdd = new PDO('mysql:host=localhost;dbname=plageco', 'root', ''); 
				 } 
				 catch(Exception $e) 
				 {
				         die('Erreur : '.$e->getMessage()); 
				 } 
                 
				 	

				    // Hachage du mot de passe 
					//$pass_hache = sha1($_GET['pass_cli']); 

					// Vérification des identifiants 
	
				 	if (isset($_GET['bouton_enreg']) && $_GET['bouton_enreg']=='Valider') {

				 		$pseudo = $_GET['pseudo'];
				 		$pass_cli = md5(sha1($_GET['pass_cli'])).'Ktt';

					 	$req = $bdd->prepare('SELECT nom_cli,prenom_cli FROM client WHERE pseudo = :pseudo AND pass_cli = :pass_cli'); 
						$req->execute(array(    'pseudo' => $pseudo,    'pass_cli' => $pass_cli  /*$pass_hache*/)); 
					 		
					 	$resultat = $req->fetch();

					 	if (!$resultat) {    echo ' <span style= "color : red">Mauvais identifiant ou mot de passe !</span>'; } 
				     	else {
				     		echo "user";
								 // Insertion du message à l'aide d'une requête préparée 
								 	$cont_avis = $_SESSION['cont_avis'];
								 	$type = $_SESSION['type'];
								 	$sujet = $_SESSION['sujet'];

									$ans = $bdd->query('SELECT count(*) AS number_avis FROM avis'); 
									 $new_avis = $ans->fetch();
								 	$ans->closeCursor();  
									 
									 $req = $bdd->prepare('INSERT INTO avis (num_avis, cont_avis, type, sujet) VALUES(?, ?,?, ?)');
									 $req->execute(array($new_avis['number_avis']+1,  $cont_avis, $type, $sujet));
									 var_dump($req->errorInfo());
									
									$pseudo = $_GET['pseudo'];
				 					$num_avis = $new_avis['number_avis']+1; 

									$req= $bdd->prepare('INSERT INTO creer (pseudo,num_avis) VALUES(?,?)');

									$req->execute(array($pseudo,$num_avis));
							
								echo '<script type="text/javascript"> alert("Message envoyé...");
																		//opener.location.reload();
																	 //setTimeout("window.close()",1);

														  </script>';

						}


					}   
					
									//header('Location: avis.php'); 
				   	
			 ?> 


			</div>


			
</body>
</html>
	

