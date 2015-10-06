<?php
/**************************************************************************
	Name            : Suriyaraj Dhanasekaran
	Student#        : 87500147 
	Description     : PHP file to create default JSON for a logged in user
					  if the JSON file is not found
***************************************************************************/
	session_save_path('/ubc/icics/mss/dsuriya/public_html/cics516/hw7/sessions');
	session_start();
	$username = $_SESSION["username"];
	$encode=  array("items" => array("Buy a pet jellyfish!", 
		"build an elaborate sculpture out of toothpicks and Swiss cheese", 
		"add &lt;em&gt; tags to my web page", 
		"buy Ben &amp; Jerry's \"large\" size ice cream."));
	$json_encode = json_encode($encode);
	$myFile = fopen("list_testuser.json", "w");
	fwrite($myFile, $json_encode);
	$toDoList = file_get_contents("list_".$username.".json");
	print $toDoList;
?>