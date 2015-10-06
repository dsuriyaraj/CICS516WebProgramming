/*
Name            : Suriyaraj Dhanasekaran
Student#        : 87500147
Description     : This the Java Script page for the Assignment 6
*/
"use strict";

// Specifying the function to load on page load
window.onload = onloadFunction;

// variable specifying no of boxes on each row
var squares = 4;

// Variable to store the no of boxes (inner divs)
var divs = 0;

// Variable indicating whether boxes are shuffled by pressing shuffle button
var shuffled = false;

// Variable specifying box size which is 100*100
var boxSize = 100;

// Variable specifying the initial top position of empty box
var emptyTop = 300 ;

//Variable specifying the initial left position of empty box
var emptyLeft = 300 ;

// This function loads when the page loads
function onloadFunction()
{
	// Setting on-click property for shuffle button
	document.getElementById("shufflebutton").onclick = shuffle;
	
	// Counting the number of child nodes in the puzzle area
	var innerDivs = $("puzzlearea").childNodes;
	var count = 0;
	
	for(var i=0; i<innerDivs.length; i++)
	{
		// Checking whether the child node is a div element
		if(innerDivs[i].nodeName == "DIV")
		{
			// Setting the class property for the div element
			innerDivs[i].setAttribute("class","puzzlepiece");
			var xDimension = parseInt(count%squares,10);
			var yDimension = parseInt(count/squares,10);
			
			// setting the background position for div (Ex: -200px -300px specifying the 4th row 3rd column box)
			innerDivs[i].style.backgroundPosition = xDimension * (-100) + "px "  + yDimension * (-100) + "px";
			
			// setting the left postion for div (Ex: 200 px specifying the 3rd column)
			innerDivs[i].style.left = xDimension * (100) + "px";
			
			// setting the top postion for div (Ex: 300 px specifying the 4th row)
			innerDivs[i].style.top = yDimension * (100) + "px" ;
			
			// setting id for div (EX: box_200_300 as id for the 4th row 3rd column box)
			innerDivs[i].setAttribute("id","box_"+xDimension * (100)+"_"+yDimension * (100));
			
			// setting onclick function for box
			innerDivs[i].onclick = boxClick;
			
			// setting mouseOver function for box
			innerDivs[i].onmouseover = mouseOver;
			
			// setting mouseOut function for box
			innerDivs[i].onmouseout = mouseOut;
			count = count +1;
		}
	}
	// setting the total number of boxes
	divs = count;
}

//This function checked whether the clicked box can be moved to the empty space
function swapCheck(box)
{
	if((returnTopPos(box)== emptyTop && Math.abs(returnLeftPos(box)- emptyLeft)== boxSize) ||
				(returnLeftPos(box)== emptyLeft && Math.abs(returnTopPos(box)- emptyTop)== boxSize)){
		
		// if box can be moved to empty space
		return true;
	}
	return false;
}

// This function will be invoked when a box is clicked.
function boxClick()
{
	// Checking whether the box can be moved to the empty space.
	if(swapCheck(this))
	{
		// If box can be moved, function call to move the box to the empty space
		swap(this);
		// function call to check whether the game is over
		checkgame();
	}
}

//This function returns the top position of the given element(box) as integer
function returnTopPos(boxVal)
{
	return parseInt(boxVal.style.top,10);
}

//This function returns the left position of the given element(box) as integer
function returnLeftPos(boxVal)
{
	return parseInt(boxVal.style.left,10);
}

//This function swaps the given box empty space and reassigns the value for the empty space
function swap(clickedBox)
{
	// fetching top position of the box
	var topPostion = returnTopPos(clickedBox);
	// fetching left position of the box
	var leftPosition = returnLeftPos(clickedBox);
	
	// swapping the box to the empty position 
	var tempTop = topPostion;
	var tempLeft = leftPosition;
	clickedBox.style.top = emptyTop + "px";
	clickedBox.style.left = emptyLeft + "px";
	
	// setting the empty box position to given box initial position
	emptyTop = tempTop ;
	emptyLeft = tempLeft;
}

//This function is invoked when mouse moves over a box
function mouseOver()
{
	if(swapCheck(this))
	{
		// adding new class to box if that box can be moved to the empty space
		this.addClassName("movablepiece");
	}
}

//This function is invoked when mouse moves out of a box
function mouseOut()
{
	if(swapCheck(this))
	{
		// removing the class once mouse moves out of the box which can be moved to empty space
		this.removeClassName("movablepiece");
	}
}

//This function is invoked when shuffle button is clicked
function shuffle()
{
	// variable is set, indication shuffle button is pressed
	shuffled = true;
	
	// boxes are moved for 800 times
	for(var b=0; b<800 ; b++)
	{
		
		// function call to select boxes which can be moved to the empty space
		var elig = selectBoxes();
		
		// selecting a random number from number of boxes available
		var ranNumber = Math.floor(Math.random()*elig.length);
		
		// swapping the random valued box to the empty space
		swap(elig[ranNumber]);
	}
}

/*
 * This function selects boxes that can be moved to the empty space.
 * Pushes the selected boxes into an array and 
 * returns the array to the calling function
 */

function selectBoxes()
{
	var eligBox = [];
	
	// Selecting boxes from number of available boxes
	for(var i=0; i<divs; i++)
	{
		var xDim = parseInt(i%squares,10);
		var yDim = parseInt(i/squares,10);
		var id = "box_"+xDim * (100)+"_"+yDim * (100);
		
		// selecting the box using its id and checking whether it can be swapped
		if(swapCheck(document.getElementById(id)))
		{
			// if the box can be swapped push it to an array
			eligBox.push(document.getElementById(id));
		}
	}
	// returning the array
	return eligBox;
}

/**
 * This method checks whether the game is won and produces an alert,
 * after boxes are shuffled 
 */
function checkgame()
{
	// checking whether the boxes are shuffled
	if(shuffled)
	{
		// checking whether the game is won
		if(checkGameOver())
		{
			// generating alert
			alert("Congrats!! You Won!! ");
			// setting shuffled variable to initial value
			shuffled = false;
		}
	}
}

/**
 * This method checks whether the game is won, that is ,
 * all the boxes are in their correct position, by comparing
 * each of the boxes current top and left position with
 * their initial starting position, which can be fetched from
 * the id of the box(div).
 * If all the boxes are in correct position true is returned, indicating
 * game over. else false is returned.
 */
function checkGameOver()
{
	for(var i=0; i<divs; i++)
	{
		var xDim = parseInt(i%squares,10);
		var yDim = parseInt(i/squares,10);
		var id = "box_"+xDim * (100)+"_"+yDim * (100);
		var leftPos = parseInt(document.getElementById(id).style.left,10);
		var topPos = parseInt(document.getElementById(id).style.top,10);
		var obtainedId = "box_"+leftPos+"_"+topPos;
		
		// checking if initial position is same as current position
		if(id != obtainedId)
		{
			return false;
		}
	}
	
	// if all the boxes are in correct position.
	return true;
}