<?php
/****************************************************************************
	Name            : Suriyaraj Dhanasekaran
	Student#        : 87500147 
	Description     : PHP file to fetch login details from userdetails.json 
*****************************************************************************/
	$userName_json = null;
	$password_json = null;
	$userName_form = null;
	$password_form = null;
	$userdetails = file_get_contents("userdetails.json");
	$user1 = json_decode($userdetails,true);
	foreach ($user1 as $key => $value) 
	{
		$userName_json = $key;
		$password_json = $value['password'];
	}
	$userName_form = $_REQUEST["username"];
	$password_form = $_REQUEST["password"];
	if(($userName_form == $userName_json) && ($password_form == $password_json))
	{
		session_save_path('/ubc/icics/mss/dsuriya/public_html/cics516/hw7/sessions');
		session_start();
		$_SESSION['username'] = $userName_form;
		print "true";
	}
	else
	{
		print("Invalid credentials");
	}
?>