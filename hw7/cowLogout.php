<?php
/************************************************************
	Name            : Suriyaraj Dhanasekaran
	Student#        : 87500147 
	Description     : Destroys the active logged in session
*************************************************************/
	session_save_path('/ubc/icics/mss/dsuriya/public_html/cics516/hw7/sessions');
	session_start();
	session_destroy();
?>