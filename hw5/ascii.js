/*******************************************************************
Name            : Suriyaraj Dhanasekaran
Student#        : 87500147
Description     : This the Java script file for the page ascii.html
********************************************************************/
"use strict";

var arrVal1;
var arrVal12;
var i =0; 
var interval =250;
var stopTimer;

//Function to change the size of the text in the text area
function ChangeSize(x)
{
	document.getElementById("textArea").style.fontSize = x;
}

//Function to store the frames of the selected type in the array
function Animate(x){
	arrVal1 = ANIMATIONS[x];
	document.getElementById("textArea").value = arrVal1;
	arrVal12 = ANIMATIONS[x];
}

//Function that cause the animation to move in the text area up to the last frame
function movingFunction()
{	
	document.getElementById("textArea").value = arrVal1[i%arrVal1.length];
	i++;
}

//Function to initiates the playback of the frames and splits them with "=====\n" as the delimiter and sets the time interval
function Start()
{
	if(arrVal1 === undefined)
	{
		return;
	}
	document.getElementById("start_button").disabled = true;
	document.getElementById("stop_button").disabled = false;
	document.getElementById("drop_down").disabled = true;
	arrVal1 = arrVal1.split("=====\n");
	if(document.getElementById("checkturbo").checked === true)
	{
		interval=50;
	}
	stopTimer=setInterval(movingFunction,interval);	//calls the moving function
}

//Function to stop the frame 
function Stop()
{
	clearInterval(stopTimer);
	document.getElementById("textArea").value = arrVal12;
	document.getElementById("start_button").disabled = false;
	document.getElementById("stop_button").disabled = true;
	document.getElementById("drop_down").disabled = false;
	arrVal1 = arrVal12;
}

//Function to Accelerate the speed of the frames depending on, if the check mark is present
function Accelerate()
{	
	clearInterval(stopTimer);	
	if(document.getElementById("checkturbo").checked === true)
	{
		interval = 50;
	} 
	else 
	{
		interval = 250;
	}
	
	if(document.getElementById("start_button").disabled===true)
	{
		stopTimer=setInterval(movingFunction,interval);
	}
}


