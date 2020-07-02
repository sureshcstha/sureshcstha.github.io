"use strict";
/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 3


   Filename: mas_register.js

   Author: Suresh Shrestha
   Date:   11/23/2019   
   
   Function List
   =============
   
   formTest()
      Performs a validation test on the selection of the conference
      session package and the conference discount number
   
   calcCart()
      Calculates the cost of the registration and saves data
      in session storage
      
   writeSessionValues()
      Writes data values from session storage in to the
      registration summary form


*/


//event listener for the window load event
window.addEventListener("load", function(){

   calcCart(); //call calcCart

   //an onclick event handler for the regSubmit button that runs the sessionTest
   document.getElementById("regSubmit").onclick = sessionTest; 

   //onblur event handlers for the input boxes that runs the calcCart
   document.getElementById("fnBox").onblur = calcCart;
   document.getElementById("lnBox").onblur = calcCart;
   document.getElementById("groupBox").onblur = calcCart;
   document.getElementById("mailBox").onblur = calcCart;
   document.getElementById("phoneBox").onblur = calcCart;
   document.getElementById("banquetBox").onblur = calcCart;

   //onchange event handler for the sessionBox selection list
   regForm.elements.sessionBox.onchange = calcCart;

   //onclick event handler for the mediaCB check box that runs the calcCart
   document.getElementById("mediaCB").onclick = calcCart;
});

//provide a validation test for the conference session selection list
function sessionTest() {
   var sIndex = regForm.elements.sessionBox.selectedIndex;
   if (sIndex === -1) {
      sessionBox.setCustomValidity("Select a Session Package");
   } else {
      sessionBox.setCustomValidity("");
   }
}


//Calculates the cost of the registration and saves data in session storage
function calcCart() {

   var fName = regForm.elements.firstName.value;
   var lName = regForm.elements.lastName.value;

   sessionStorage.setItem("confName", fName + " " + lName);
	sessionStorage.setItem("confGroup", document.forms.regForm.group.value);
	sessionStorage.setItem("confMail", document.forms.regForm.email.value);
	sessionStorage.setItem("confPhone", document.forms.regForm.phoneNumber.value);
   sessionStorage.setItem("confBanquet", document.forms.regForm.banquetGuests.value);
   
   var sIndex = regForm.elements.sessionBox.selectedIndex;
   var confSession;
   var confSessionCost;

   if (sIndex === -1) {
      confSession = ""; // store the empty string
      confSessionCost = 0; // store 0
   } else {
      //store selected option text 
      confSession = regForm.elements.sessionBox.options[sIndex].text;  
      //store value of selected option 
      confSessionCost = regForm.elements.sessionBox.options[sIndex].value; 
   }
   sessionStorage.setItem("confSession", confSession);


   var confBanquet = document.forms.regForm.banquetGuests.value;
   //cost of the banquet =  $55 * per guest
   var confBanquetCost = confBanquet * 55;


    var confPack;
    var confPackCost;
    if (document.forms.regForm.elements.mediaPack.checked){
      confPack = "yes";  // store the values yes
      confPackCost = 115; // store 155
    }else {
      confPack = "no"; // store the values no
      confPackCost = 0; // store 0
   }
   sessionStorage.setItem("confPack", confPack);
   

   //Calculate the total registration cost 
   sessionStorage.setItem("confTotal", parseFloat(confSessionCost) + confBanquetCost + confPackCost);

   writeSessionValues();  //call writeSessionValues function
}

//Writes data values from session storage in to the registration summary form
function writeSessionValues() {
   document.getElementById("regName").textContent = sessionStorage.getItem("confName");
   document.getElementById("regGroup").textContent = sessionStorage.getItem("confGroup");
   document.getElementById("regEmail").textContent = sessionStorage.getItem("confMail");
   document.getElementById("regPhone").textContent = sessionStorage.getItem("confPhone");
   document.getElementById("regSession").textContent = sessionStorage.getItem("confSession");
   document.getElementById("regBanquet").textContent = sessionStorage.getItem("confBanquet");
   document.getElementById("regPack").textContent = sessionStorage.getItem("confPack");
   document.getElementById("regTotal").textContent = "$" + sessionStorage.getItem("confTotal");
}