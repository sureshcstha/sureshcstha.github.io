"use stric";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 9
   Case Problem 4

   Countdown Clock for Ticket Ordering
   Author: Suresh Shrestha
   Date:   10/19/2019

   Filename:   ph_clock.js     

*/


/* ------------------------------------------------- */
var minsLeft  = 30; 
var secsLeft  = 0; 
var timeLeft  = minsLeft*60 + secsLeft; 

countdown();
var clocklD = setInterval("countdown()", 1000); //runs the countdown function every second 


//countdown function 
function countdown(){
minsLeft = Math.floor(timeLeft/60); //calculate minutes left
secsLeft = timeLeft - 60*minsLeft; //calculate seconds left

var minsString = addLeadingZero(minsLeft);  //adds leading zeroes when values are between 0 and 9
var secsString = addLeadingZero(secsLeft); //adds leading zeroes when values are between 0 and 9

//Display the value inside the html
document.getElementById("minutes").textContent = minsString;
document.getElementById("seconds").textContent = secsString;

timeLeft--;  // decreases the value of time timeLeft variable by 1

checkTimer();  // checks if there is any time left

} // countdown function end

//this functions stops clock once the time to submit the order has run out
function stopClock(){
   TimeHead.insertAdjacentHTML("beforeend", "<br /> (Order Expired)");
   clearInterval(clocklD);
}

/* The checkTimer() function tests whether there is any time left to make the
   ticket order. If the time left is 0, the stopClock() function is run;
   otherwise nothing happens and the program continues to run. */
   
function checkTimer() {
   if (timeLeft === 0) stopClock();
}


/* The addLeadingZero() function adds a leading zero to values which are less than 10 */

function addLeadingZero(num) {
   var numStr = (num < 10) ? ("0" + num) : "" + num;
   return numStr;
}
