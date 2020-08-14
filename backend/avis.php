<!DOCTYPE html>
<html>
	<head>

		<title>1001 Piles Batteries Togo/avis</title>
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
		<?php include("header.php"); ?>

			
			<div class="container" style="margin-top: 150px;">
				
			<p class="float-right">Ecrivez <a href="#type" > un avis  </a></p>

			<?php 
				try { 
						$bdd = new PDO('mysql:host=localhost;dbname=plageco', 'root', ''); 
					} 
				catch (Exception $e) 
					{        
						die('Erreur : ' . $e->getMessage()); 
					} 
			?>

			<div class=" container avis " style=" margin-left: 50px;width: 80%; ">

			 <?php 
			 		$ans = $bdd->query('SELECT client.nom_cli, client.prenom_cli,creer.num_avis
		 								  FROM client
		 								  INNER JOIN creer
		 							      ON client.pseudo=creer.pseudo
		 							      ORDER BY num_avis DESC
		 							  
		 								');

			 		$anss = $bdd->query('SELECT  date(avis.date_avis) 
										 AS datee, time(avis.date_avis) 
										 AS timee, avis.cont_avis,avis.num_avis
		 								 FROM avis
		 							   	 ORDER BY num_avis DESC
		 								');
			 		
			 	

				 	while ( $donne = $ans->fetch() and $donnee = $anss->fetch()  ) {
				 		 echo  '<strong style=" color: blue;font-size: 80%;"> ' 
				 		 . $donne['nom_cli'] . ' ' . $donne['prenom_cli'] .' 
						 		    <div style="background-color: #f5f5f5;font-family: Monospace;"> 
						 		</strong> 
						 		    <div style="margin-left:550px;"> à écrit le '  
						 						  . $donnee['datee'] . ' à ' .  $donnee['timee'] . ' 
						 		    </div>  <br/> 
					 				    <div  style="font-family: serif; color: darkblue"> &nbsp'
					 						  . $donnee['cont_avis']   
					 			     .' </div><br/> 
				 			     </div> ' ;

 						 $return = $bdd->query('SELECT repondre.reponse, date(repondre.date_reponse)
				 							    AS datee_reponse,time(repondre.date_reponse)
				 							    AS timee_reponse
											    FROM repondre 
											    WHERE num_avis=' . $donnee['num_avis'] 
			 						          );

	 						  while ( $donneee=$return->fetch()) {
 						  echo  ' <strong style =  "color:yellow; text-shadow:0px 0px  3px black; 
			 				 		 font-size: 79%;"> '.' &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 
			 				 		 1001 Piles & Batteries '.'
			 					<div style="background-color: #f5f5f5;font-family: Monospace;">   
			 				      </strong>  
			 					<div style="margin-left:550px;"> à répondu le '  
				 			              .$donneee['datee_reponse'] . ' à ' . $donneee['timee_reponse'] . '
				 			    </div> <br/> 
				 			    <div  style="font-family: serif; color: darkblue; "> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp '
				 			              .$donneee['reponse']		
				 			  .'</div> <br/>  
				 			    </div>' 
	 						  ;} 
	 			    ;}
	 			    $ans->closeCursor();$anss->closeCursor();

                  
		?>				
			
			</div>
			  <br/>
				 	
				 		
				        	 			        
	 				<form action="enreg.php" method="get" target="popup" onsubmit="window.open('enreg.php','popup','width=440, height=330,menubar=no,scrollbar=no')">        
	 					<div style="text-align: left; margin-left: 200px;">
						     	<label for="type">Type de l'avis  </label>
						     	<br/>
					   	        <select name="type" id="type">      
					               <option value="piles">Piles</option>
		                           <option value="batteries">Batteries</option>           
		                           <option value="chargeurs">Chargeurs</option>
		                           <option value="chargeurs">Equipements</option>
		                           <option value="chargeurs">Reconditionnements</option>           
					            </select> 

				        		<br/>
		 						<label for="sujet">Sujet &nbsp&nbsp </label>
		 						<br/>
		 						<input type="text" name="sujet" id="sujet" size="75" /><br /> 

		 						<label for="cont_avis">Votre avis</label> 
		 						<br/>
		 						<textarea type="text" name="cont_avis" id="cont_avis" rows="4" cols="77"></textarea><br/>
		 				</div>
		 			    <input type="submit" name="bouton_avis" value="Envoyer" style="margin-left: 460px;">
 						 
 					</form>

		</div>
	    </div>


	    <!-- FOOTER -->
    <?php include("footer.php"); ?>

    <!--Chargement des scriprts-->

     <!-- <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>-->
      <script type="text/javascript" src="js/jQuery v3.3.1.js"></script>	
      <!--<script type="text/javascript" src="js/carousel.js"></script>-->
      <script type="text/javascript" src="js/poper.js"></script>
      <script type="text/javascript" src="js/bootstrap.min.js"></script>

</body>
</html>