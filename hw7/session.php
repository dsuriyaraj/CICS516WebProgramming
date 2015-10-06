<?php
/************************************************************
	Name            : Suriyaraj Dhanasekaran
	Student#        : 87500147 
	Description     : PHP file to check for user's session, 
					  returns true if session is active 
					  else returns false
*************************************************************/
	session_save_path('/ubc/icics/mss/dsuriya/public_html/cics516/hw7/sessions');
	session_start();
	if(isset($_SESSION['username']))
	{
		$username = $_SESSION['username'];
		print $username;
	}
	else
	{
		print "false";
	}
?>