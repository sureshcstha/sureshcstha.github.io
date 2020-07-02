"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Case Problem 4

   Author: Suresh Shrestha
   Date:   10/28/2019   
   
   Filename: vw_results.js
   
   Functions:
   
   The calcSum() function is a callback function used to
   calculte the total value from items within an array
   
   The calcPercent(value, sum) function calculates the percentage given
   a value and a sum
   
   The createBar(partyType, percent) function writes a different
   table data table based on the candidates party affilication.
   
      
*/
/* Callback Function to calculate an array sum */
function calcSum(value) {
   totalVotes += value;
}

/* Function to calculate a percentage */
function calcPercent(value, sum) {
   return (100*value/sum);
}

var reportHTML = "<h1>" + raceTitle + "</h1>"; //declare reportHTML variable

//for loop loops through the contents of the race array
for (var i = 0; i < race.length; i++) {
    var totalVotes = 0; //declare totalVotes variable
    votes[i].forEach(function(value) {calcSum(value)});
    reportHTML += "<table><caption>" + race[i] + "</caption><tr><th>Candidate</th><th>Votes</th></tr>";
    reportHTML += candidateRows(i, totalVotes); //call candidateRows function
    reportHTML += "</table>"
}
document.getElementsByTagName("section")[0].innerHTML = reportHTML;



//The candidateRows function to write individual table rows for each candidates
//showing candidate's name, party affiliation, vote total, and vote percentage
function candidateRows(raceNum, totalVotes) {
    var rowHTML = ""; //declare local variable rowHTML with empty text string
    //for loop 
    for (var j = 0; j <= 2; j++) {
        var candidateName = candidate[raceNum][j]; //declare candidateName variable
        var candidateParty = party[raceNum][j]; //declare candidateParty variable
        var candidateVotes = votes[raceNum][j]; //declare candidateVotes variable
        var candidatePercent = calcPercent(candidateVotes , totalVotes); //declare candidatePercent variable
        rowHTML += "<tr><td>"+ candidateName +" ("+candidateParty+")</td><td>"+ 
        candidateVotes.toLocaleString() + "("+ candidatePercent.toFixed(1) + "%" + ")</td>"

        for (var k = 0; k < candidatePercent.toFixed(0); k++) {
         rowHTML += createBar(candidateParty)
     }
     rowHTML += '</tr>';
    }
    return rowHTML;  //return the value of rowHTML
}

//The createBar function to display the vote percentages as bar charts
function createBar(partyType) {
   var barHTML = ""; //declare variable barHTML with empty text string
   //switch statement
   switch (partyType) {
      case "D":
          barHTML = "<td class='dem'></td>";
          break;
      case "R":
          barHTML = "<td class='rep'></td>";
          break;
      case "I":
          barHTML = "<td class='ind'></td>";
          break;
  }
  return barHTML; //return the value of barHTML
}




