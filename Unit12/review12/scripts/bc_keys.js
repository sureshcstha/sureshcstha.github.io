"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Review Assignment

   Author: Suresh Shrestha 
   Date:   11/10/2019  

   Filename: bc_keys.js

   Functions
   =========
   
   findKeyWords()
      Locate the keywords in the article indicated by the <dfn> tag
      and add those keywords in alphabetical order to a keyword box.
      
   makeKeyStyles()
      Create an embedded style sheet for the keyword box.

      
   replaceWS(textStr)
      Replaces occurences of one or more consecutive white space
      characters with the _ character.

*/

window.addEventListener("load", findKeyWords); //run function when page is loaded
window.addEventListener("load", makeKeyStyles); //run function when page is loaded

//function to locate the keywords from the document and generate the keyword list
function findKeyWords() {
   var keywords = document.createElement("aside");
   keywords.setAttribute("id", "keywords");  //crete aside element with ID "keywords"

   var heading = document.createElement("h1");
   heading.innerHTML = "Keywords List"; //create h1 heading with text "Keywords List"
   keywords.appendChild(heading);


   var orderList = document.createElement("ol");
   keywords.appendChild(orderList); //append ol element to aside element
   
   //create an object collection named keyWordElems refering all dfn elements within the doc
   var keyWordElems = document.querySelectorAll("article#doc dfn"); 
   //create array named keyWords equal to lenght of keyWordElems
   var keyWords = new Array(keyWordElems.length); 

   for(var i = 0; i < keyWordElems.length; i++) {
      keyWords[i]= keyWordElems[i].textContent; //set value of each keyWords to correspnding keyWordElems
      var linkID = replaceWS(keyWords[i]); //call replaceWS() function and store in linkID
      keyWordElems[i].setAttribute("id","keywoard_" + linkID);
   }

   keyWords.sort(); //sort keyWords array in alphabetical order

   for (var i = 0; i < keyWords.length; i++) {
      var keyWordListItem = document.createElement("li"); //declare keyWordListItem storing li
      var keyWordLink = document.createElement("a"); //declare keyWordLink storing a

      keyWordLink.innerHTML = keyWords[i]; //change innerHTML to the current keyword
      var linkID = replaceWS(keyWords[i]); //declare linkID, equals valure returned by replaceWS()
      keyWordLink.setAttribute("id", keyWords[i] + linkID);
      keyWordListItem.appendChild(keyWordLink); //append keyWordLink to keyWordListItem
      orderList.appendChild(keyWordListItem); //append keyWordListItem to orderList
   }

   //insert the keywords list box
   var doc = document.getElementById("doc");
   doc.insertBefore(keywords, doc.firstChild);

}

//create embedded style sheet 
function makeKeyStyles() {

   var embStyle = document.createElement("style");
   document.head.appendChild(embStyle);

   document.styleSheets[document.styleSheets.length-1].insertRule(
      "aside#keywords { \
      border: 3px solid rgb(101, 101, 101); \
      float: right; \
      margin: 20px 0px 20px 20px; \
      padding: 10px; \
      width: 320px; \
      }", 0);

   document.styleSheets[document.styleSheets.length-1].insertRule(
      "aside#keywords h1 { \
      font-size: 2em; \
      margin: 5px; \
      text-align: center; \
      }", 1);

   document.styleSheets[document.styleSheets.length-1].insertRule(
      "aside#keywords ol { \
      font-size: 20px; \
      font-size: 1.2em; \
      }", 2);

   document.styleSheets[document.styleSheets.length-1].insertRule(
      "aside#keywords ol li { \
      line-height: 1.5em; \
      }", 3);

   document.styleSheets[document.styleSheets.length-1].insertRule(
      "aside#keywords ol li a { \
      color: rgb(101, 101, 101); \
      text-decoration: none; \
      }", 4);

}


/* Supplied Functions */

function replaceWS(textStr) {
   var revText = textStr.replace(/\s+/g,"_");
   return revText;
}
