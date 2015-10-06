/*********************************************************************
	Name            : Suriyaraj Dhanasekaran
	Student#        : 87500147  
	Description     : JavaScript File to control Elements in cow.html 
					  and place AJAX request to PHP pages, fetch AJAX 
					  response from PHP pages.
**********************************************************************/
"use strict";

window.onload = bodyload;

//function to set the desired element's visibility
function bodyload()
{
	new Ajax.Request("session.php",{onSuccess:sessionSuccess});
	$("Login").onclick = createLogin;
	$("toDoDiv").hide();
	$("addanItem").onclick = addanItem ;
	$("deleteanItem").onclick = deleteanItem;
	$("logout").onclick = logout;
	$("invalid").hide();
}

//if a session is active & when the user refreshes the page, user will be in current page
function sessionSuccess(ajax)
{
	if(ajax.responseText != "false") 
	{
		loadToDoDiv();
	}
}

//function which is invoked when Login button is clicked
function createLogin()
{
	new Ajax.Request("cowLogin.php",
		{
			parameters:{username:$F("username").escapeHTML(),password:$F("password").escapeHTML()},
			onSuccess:loginSuccess
		}
	);	
}

//loads the to-do-list element in the HTML page once the user is successfully logged in
function loginSuccess(ajax)
{
	if(ajax.responseText == "true")
	{
		loadToDoDiv();
	}
	else
	{
		$("invalid").show();
		$("invalid").pulsate();
	}
}

//gets the session's user name 
function getuserName()
{
	new Ajax.Request("session.php" , { onSuccess: onUpdateName});
}

//places AJAX request to cowGet.php & on Success invokes the displayToDoList function
function loadToDoDiv()
{
	new Ajax.Request("cowGet.php",
	{ 
		onSuccess: displayToDoList
	});	
}

//set's the TO-do-list's user name
function onUpdateName(ajax)
{
	$("userTag").innerHTML=ajax.responseText + "'s To-Do-List";
}

//Function called when user is successfully logged in
function displayToDoList(ajax)
{
	if(ajax.responseText == "404 Resource Not Found")
	{
		alert(ajax.responseText);
		//AJAX request to create the default JSON for logged in user
		generateJson();
	} 
	else 
	if(!(ajax.responseText == "404 Resource Not Found") || !(ajax.responseText == "List file has null"))
	{
		$("login").hide();
		$("toDoDiv").show();
		$("toDoList").innerHTML=""; 
		$("itemtobeAdded").value="";
		getuserName();
		// setting the to-do-list values in li elements
		var toDoListData = JSON.parse(ajax.responseText);
		for(var i=0; i<toDoListData.items.length; i++)
		{
			var li = document.createElement("li");
			li.innerHTML = toDoListData.items[i];
			li.id = "toDoList_" + i;
			$("toDoList").appendChild(li);
		}
		Sortable.create("toDoList",{onUpdate:listUpdate});
	}
}

//to handle the list, shake and repositioning of the list elements
function listUpdate(list)
{
	list.shake();
	populateJson();
}

//method to handle repositioning of the list elements and reflect it in JSON
function populateJson()
{
	var arrayList = [];
	var childElements = $("toDoList").childElements();
	for(var i=0;i<childElements.length;i++)
	{
		arrayList.push(childElements[i].innerHTML);
	}
	var jsonEncodeArray = JSON.stringify(arrayList);
	new Ajax.Request("cowUpdate.php",
		{
			parameters: {encodedarray:jsonEncodeArray},
			onSuccess:loadToDoDiv
		}
	);
}

//if user's To-do-list JSON file is not present, then generate the default JSON file, on success invoke loadToDoDiv
function generateJson()
{
	alert("Generating JSON file");
	new Ajax.Request("createJson.php",{onSuccess:loadToDoDiv});
}

//function to delete an item from the top of the list
function deleteanItem()
{
	$("toDoList").shake();
	var arrayList = [];
	$("toDoList").removeChild($("toDoList").firstChild);
	var childElements = $("toDoList").childElements();
	for(var i=0;i<childElements.length;i++)
	{
		arrayList[i] = childElements[i].innerHTML;
	}
	var jsonEncodeArray = JSON.stringify(arrayList);
	new Ajax.Request("cowUpdate.php",
		{
			parameters: {encodedarray:jsonEncodeArray},
			onSuccess:loadToDoDiv
		}
	);	
}

//function to add an item to bottom of the list
function addanItem()
{
	$("toDoList").shake();
	if(($F("itemtobeAdded").length) > 0 )
	{
		var arrayList = [];
		var childElements = $("toDoList").childElements();
		for(var i=0;i<childElements.length;i++)
		{
			arrayList.push(childElements[i].innerHTML);
		}
		arrayList.push($F("itemtobeAdded").escapeHTML());
		var jsonEncodeArray = JSON.stringify(arrayList);
		new Ajax.Request("cowUpdate.php",
			{
				parameters: {encodedarray:jsonEncodeArray},
				onSuccess:loadToDoDiv
			}
		);
	}
}

//loads the login form
function login(ajax)
{
	$("login").show();
	$("toDoDiv").hide();
	$("invalid").hide();
	$("username").value="";
	$("password").value="";
}

//function which is invoked when Log out is clicked
function logout()
{
	new Ajax.Request("cowLogout.php",{onSuccess:login});
}