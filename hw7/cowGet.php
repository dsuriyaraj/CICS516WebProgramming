<?php
/********************************************************
	Name            : Suriyaraj Dhanasekaran
	Student#        : 87500147 
	Description     : PHP file to retrieve contents from 
					  JSON file
*********************************************************/
	session_save_path('/ubc/icics/mss/dsuriya/public_html/cics516/hw7/sessions');
	session_start();
	if(isset($_SESSION['username']))
	{
		if(file_exists("list_".$_SESSION['username'].".json"))
		{
			$toDoList = file_get_contents("list_".$_SESSION['username'].".json");
			print $toDoList;
		}
		else
		{
			print "404 Resource Not Found";
		}
	}
?>