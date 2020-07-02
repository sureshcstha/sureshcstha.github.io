"use stric";
/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 9
   Tutorial Case

   Countdown Clock
   Author: Suresh Shrestha 
   Date:   10/15/2019

*/


/*Display the current date and time */
document.getElementById("dateNow").innerHTML =
"m/d/y<br />h:m:s";

/*Display the time left until New Year's Eve */
document.getElementById("days").textContent = "dd";
document.getElementById("hrs").textContent = "hh";
document.getElementById("mins").textContent = "mm";
document.getElementById("secs").textContent = "ss";

/* Execute the function to run and display the countdown clock */
runClock();
setInterval("runClock()", 1000);


/* Function to create and run the countdown clock */
function runClock(){

//Stores the current date and time 
var currentDay = new Date(); //stored in millisecond since 1/1/1970
var dateStr = currentDay.toLocaleDateString();  //show 5/23/2018
var timeStr = currentDay.toLocaleTimeString(); // show show 2:35:05 PM

/*Display the current date and time */
document.getElementById("dateNow").innerHTML = dateStr + "<br/>" + timeStr;

//calculate the days until January 1st
var newYear = new Date("January 1, 2019"); //temp placeholder
var nextYear = currentDay.getFullYear() + 1;
newYear.setFullYear(nextYear);

//calculate days, hours, minutes, and seconds left
var daysLeft = (newYear - currentDay)/(1000*60*60*24); //conversion from millisecond
var hrsLeft = (daysLeft - Math.floor(daysLeft))*24;
var minsLeft = (hrsLeft - Math.floor(hrsLeft))*60;
var secsLeft = (minsLeft - Math.floor(minsLeft))*60;

//Display the value inside the html
document.getElementById("days").textContent = Math.floor(daysLeft); //Math.floor rounds down 
document.getElementById("hrs").textContent = Math.floor(hrsLeft);
document.getElementById("mins").textContent = Math.floor(minsLeft);
document.getElementById("secs").textContent = Math.floor(secsLeft);

} //runClock function end