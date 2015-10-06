<?php
/**********************************************************
	Name            : Suriyaraj Dhanasekaran
	Student#        : 87500147 
	Description     : Populate the user's JSON file 
					  by fetching the current user's name
***********************************************************/
	session_save_path('/ubc/icics/mss/dsuriya/public_html/cics516/hw7/sessions');
	$getarray = json_decode($_REQUEST ["encodedarray"]);
	session_start();
	$jsonEncodeArray = array('items'=>$getarray);
	file_put_contents("list_". $_SESSION["username"].".json", json_encode($jsonEncodeArray));
	$fileArray = file_get_contents( "list_" . $_SESSION ["username"] . ".json" );
	print $fileArray;
?>