"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Tutorial Case

   Author: Suresh Shrestha 
   Date:   10/22/2019

   Filename:   lht_calendar.js  


   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the weekday title rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate
	
*/

//set the date that will be displayed in the calendar
var thisDay = new Date();

//Write that date out to the HLML
document.getElementById("calendar").innerHTML = createCalendar(thisDay);

function createCalendar(calDate) {
   var calendarHLML = "<table id='calendar_table'>";
   calendarHLML += calCaption(calDate);
   calendarHLML += calWeekdayRow();
   calendarHLML += calDays(calDate);
   calendarHLML += "</table>";
   return calendarHLML; 
}

//Function to write the calendar caption
function calCaption(calDate) {
   //month array
   var monthName = ["January", "February", "March", "April",
      "May", "June", "July", "August", "September",
      "October", "November", "December"];

   //determine the current month
   var thisMonth = calDate.getMonth();
   //determine the current year
   var thisYear = calDate.getFullYear();

   return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";
}

//Function to write a table row of weekday abbreviations 
function calWeekdayRow() {
   var dayName =  ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
   var rowHTML = "<tr>";

   //Loop through the columns
   for (var i = 0; i < dayName.length; i++) {
      rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
   }
   rowHTML += "</tr>";
   return rowHTML;   
}

//function to calculate the number of days in the month
function daysInMonth(calDate) {
   var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];
   //extract 4 digit year and month value
   var thisYear = calDate.getFullYear();
   var thisMonth = calDate.getMonth();

   //handle the leap hear
   if (thisYear % 4 === 0) {
      if ((thisYear % 100 != 0) || (thisYear % 400 === 0)){
      dayCount[1] = 29;
      }
   }

   //return the number of days for the current month
   return dayCount[thisMonth];
}

//Function to create the columns for each day like 1-31, but we to know starting
function calDays (calDate) {
   var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
   var weekDay = day.getDay();  //returns day of week 0 based Sunday

   //write out the blank cells
   var htmlCode = "<tr>";
   for (var i=0; i<weekDay; i++){
      htmlCode += "<td></td>";
   }
   //write out the actual days
   var totalDays = daysInMonth(calDate);
   var highlightDay = calDate.getDate();

   for (var i=1; i<=totalDays; i++){
      day.setDate(i);
      weekDay = day.getDay();
      //check to see if Sunday
      if (weekDay === 0) htmlCode += "<tr>";
      if(i === highlightDay){
         htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i]+ "</td>";
      }else {
         htmlCode += "<td class='calendar_dates'>"+ i + dayEvent[i] + "</td>";
      }
      //check to see if Saturday
      if (weekDay === 6) htmlCode += "</tr>";
   }
   return htmlCode;
}