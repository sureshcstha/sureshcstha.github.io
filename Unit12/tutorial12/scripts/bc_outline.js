"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Tutorial Case

   Author: Suresh Shrestha
   Date:   11/05/2019  

   Filename: bc_outline.js


   Function List
   =============

   makeOutline()
      Generates the text of the table of contents
      as a nested list

   createList(source, TOCList, headings)
      Creates an outline based on the source document,
      list items are appended to TOCList,
      the list items are based on the element names
      specified in the headings array


*/

//generate an outline based on H1 through H6 headings in the source 

window.addEventListener("load", makeOutline);

function makeOutline() {
   //inentify the location of where I'm placing the outline
   var outline = document.getElementById("outline");
   //inentify the source of where we are reading from
   var source = document.getElementById("doc");

   var makeHeading = document.createElement("h1");
   var outlineList = document.createElement("ol");
   var headingText = document.createTextNode("Outline");

   makeHeading.appendChild(headingText);
   outline.appendChild(makeHeading);
   outline.appendChild(outlineList);

   createList(source, outlineList);
}


function createList(source, outlineList) {
   // Headings for the outline
	var headings = ["H1", "H2", "H3", "H4", "H5", "H6"];
	// Previous level of the Headings
	var prevLevel = 0;
	// Running total of the article headings
   var headNum = 0;
   
   //loop through all the children for now
   for (var n = source.firstChild; n !== null; n = n.nextSibling) {
		// Examine only article headings
		var headLevel = headings.indexOf(n.nodeName);
		
		if (headLevel !== -1) {
			// Add an id to the heading if it is missing
			headNum++
			if (n.hasAttribute("id") === false) {
				n.setAttribute("id", "head" + headNum);
			}
			var listElem = document.createElement("li");
			
			// Create hypertext links to the document headings
			var linkElem = document.createElement("a");
			linkElem.innerHTML = n.innerHTML;
			linkElem.setAttribute("href", "#" + n.id);
			
			// Append the hypertext liink to the list item
			listElem.appendChild(linkElem);

			
			
			if (headLevel === prevLevel) {
				//Append the list item to the current list
				outlineList.appendChild(listElem);
			}  else if (headLevel > prevLevel) {
				//Start a new nested list
				var nestedList = document.createElement("ol");
				nestedList.appendChild(listElem);
				// Append nested list to last item in the current list
				outlineList.lastChild.appendChild(nestedList);
				// Change the current list to the nested list
				outlineList = nestedList;
			} else {
				// Append the list item to a higher list
				// Calculate the difference between the current and previous level
				var levelUp = prevLevel - headLevel;
				// Go up to the higher level
				for (var i = 1; i <= levelUp; i++) {
					outlineList = outlineList.parentNode.parentNode;
				}
				outlineList.appendChild(listElem);
			}
				
				prevLevel = headLevel;
			}
		}
	}