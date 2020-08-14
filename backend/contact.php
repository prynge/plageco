<!DOCTYPE html>
<html>
<head>
		<title>1001 Piles Batteries Togo/produits</title>
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

		<?php include('header.php'); ?>

        <div class="container" style="margin-top: 130px">	

			

			<center class="formulaire ">
					<h4>Contactactez nous</h4> <br/>

	                <form method="post" action="formulaire.php">
	                	<br/>
	                    <p><input type="text" name="nom" placeholder=" Nom" required size="66"/></p>
	                    <br/>
	                    <p><input type="email" name="mail" placeholder=" E-mail" required size="66"/></p>
	                    <br/>
	                    <p><input type="text" name="objet" placeholder=" Objet" size="66"/></p>
			
		    <div class="message">
		    			<br/>
	                    <p><textarea name="message" placeholder=" Message" required rows="3" cols="69"></textarea></p>
	                    <input type="submit" value="Envoyer" />
	        </div>
                    </form>  

            </center>

          
        </div>
<?php include('footer.php'); ?>

     <!--Chargement des scriprts-->

     <!-- <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>-->
      <script type="text/javascript" src="js/jQuery v3.3.1.js"></script>	
      <!--<script type="text/javascript" src="js/carousel.js"></script>-->
      <script type="text/javascript" src="js/poper.js"></script>
      <script type="text/javascript" src="js/bootstrap.min.js"></script>

</body>
</html