<!DOCTYPE html>
<!-- 
Name        : Suriyaraj Dhanasekaran
Student Id  : 87500147
Description : This PHP is a review page for the movies. 
	 		  This page portrays the reviews of various people and an overview about the movie.
-->
<html>
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/css" href="movie.css">		
		<link rel="icon" type="image/png" href="http://ws.mss.icics.ubc.ca/~cics516/cur/hw/hw2/images/rotten.gif">
		<title>Rancid Tomatoes</title>
	</head>
	
	<body>
		<header>
			<img src="http://ws.mss.icics.ubc.ca/~cics516/cur/hw/hw2/images/banner.png" alt="Rancid Tomatoes">
		</header>
	
		<?php #Movie Info
			$movie=($_REQUEST['film']);
			$info = file($movie.'/info.txt');
		?>
		
		<h1><?php echo $info[0].' ('.trim($info[1]).')'; ?></h1>
		
		<div id="contentArea">
			<div id="left">
				<div id="leftTop">
					<?php #Rating Image based on the overall rating
						if($info[2]>=60)
						{
							$rating_image="http://ws.mss.icics.ubc.ca/~cics516/cur/hw/hw3/images/freshbig.png";
						}
						else
						{
							$rating_image="http://ws.mss.icics.ubc.ca/~cics516/cur/hw/hw2/images/rottenbig.png";
						}
					?>
					<img src=<?php echo $rating_image; ?> alt="Rotten">
					<span id="rating"><?php echo $info[2].'%';?></span>
				</div>
				
				<div id="reviewLeft" class="reviews">
					<?php #Reviews(selecting half of the reviews to be displayed on the left side)
						$files=glob($movie.'/review*.txt');
						$file_count=count($files);
						$file_midpoint=ceil($file_count/2.0); 
						for ($i=0;$i<$file_midpoint;$i++) 
						{
							$review_lines = file($files[$i]);
							if(trim($review_lines[1])=="FRESH")
							{
								$review_image="http://ws.mss.icics.ubc.ca/~cics516/2015/hw/hw3/images/fresh.gif";
							}
							else
							{
								$review_image="http://ws.mss.icics.ubc.ca/~cics516/2015/hw/hw3/images/rotten.gif";
							}
							$review_html= "<div class=\"review\"> <img class=\"reviewImage\" src={$review_image} alt=\"Rotten\"> ";
							$review_html.="<q>{$review_lines[0]}</q></div>";
							$review_html.="<div class=\"reviewer\"> <img class=\"reviewerimage\" src=\"http://ws.mss.icics.ubc.ca/~cics516/cur/hw/hw2/images/critic.gif\" alt=\"Critic\">";
							$review_html.="{$review_lines[2]}<br> <span class=\"publication\">{$review_lines[3]}</span></div>";
							echo $review_html;	
						}
					?>
				</div>

				<div id="reviewRight" class="reviews">
					<?php #Reviews(selecting remaining half of the reviews to be displayed on the right side)
						for ($j=$file_midpoint;$j<$file_count;$j++) 
						{
							$review_lines = file($files[$j]);
							if(trim($review_lines[1])=="FRESH")
							{
								$review_image="http://ws.mss.icics.ubc.ca/~cics516/2015/hw/hw3/images/fresh.gif";
							}
							else
							{
								$review_image="http://ws.mss.icics.ubc.ca/~cics516/2015/hw/hw3/images/rotten.gif";
							}
							$review_html= "<div class=\"review\"> <img class=\"reviewImage\" src={$review_image} alt=\"Rotten\"> ";
							$review_html.="<q>{$review_lines[0]}</q></div>";
							$review_html.="<div class=\"reviewer\"> <img class=\"reviewerimage\" src=\"http://ws.mss.icics.ubc.ca/~cics516/cur/hw/hw2/images/critic.gif\" alt=\"Critic\">";
							$review_html.="{$review_lines[2]}<br> <span class=\"publication\">{$review_lines[3]}</span></div>";
							echo $review_html;	
						}
					?>
				</div>
			</div>
		
			<div id="right">
				<img src=<?php echo $movie.'/overview.png';?> alt="general overview">
				<dl>
					<?php #Overview of the movie
						$overview_lines = file($movie.'/overview.txt');
						foreach ($overview_lines as $line) 
						{
							{
								$overview_string =explode(":", $line);
								if($overview_string[0]!="LINKS")
									echo '<dt>'.$overview_string[0].'</dt>'.'<dd>'.$overview_string[1].'</dd>';
								else
									echo '<dt>'.$overview_string[0].'</dt>'.'<dd>'.'<a href="http://www.ninjaturtles.com">The Official TMNT Site</a>'.'</dd>';
							}
						};
					?>
				</dl>
			</div>
			
			<footer>
				<p>(1-<?php echo $file_count;?>) of <?php echo $file_count;?></p>
			</footer>
		</div>

		<div id="Validation">
			<a href="https://webster.cs.washington.edu/validate-html.php"><img src="http://ws.mss.icics.ubc.ca/~cics516/2015/hw/hw2/images/w3c-xhtml.png" alt="Valid HTML5"></a> <br>
			<a href="https://webster.cs.washington.edu/validate-css.php"><img src="http://ws.mss.icics.ubc.ca/~cics516/2015/hw/hw2/images/w3c-css.png" alt="Valid CSS"></a>
		</div>
	</body>
</html>