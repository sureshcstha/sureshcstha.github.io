"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Review Assignment

   Author: Suresh Shrestha
   Date:   10/27/2019  

	
*/

var thisDay = new Date("August 30, 2018");  // declare variable thisDay

// create variable named tableHTML
var tableHTML = "<table id='eventTable'><caption>Upcoming Events</caption><tr><th>Date</th><th>Event</th><th>Price</th></tr>";

var endDate = new Date(thisDay.getTime() + 14 * 24 * 60 * 60 * 1000); //declare endDate variable

//for loop loops through the lenght of eventDates array
    for (var i = 0; i < eventDates.length; i++){
        var eventDate = new Date(eventDates[i]);  //declare eventDate variable
        var eventDay = eventDate.toDateString(); //declare eventDay variable
        var eventTime = eventDate.toLocaleTimeString(); //declare eventTime variable
        var description = eventDescriptions[i]; //declare description variable
        var price = eventPrices[i]; //declare price variable

        //test conditional expressions
        if (thisDay <= eventDate && eventDate <= endDate) {
            tableHTML += "<tr><td>" + eventDay + " @ " + eventTime + "</td><td>" + 
            description + "</td><td>" +
            price + "</td></tr>";
        }
    }

    tableHTML += "</table>";

   //Write the value of tableHTML to the inner HLML
    document.getElementById("eventList").innerHTML = tableHTML;