"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Review Assignment

   Author: Suresh Shrestha 
   Date:   11/03/2019

   Global Variables
   ================
   
   allCells
      References the TD cells within the Hitori table grid.   
      
   Function List
   =============

   startUp()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   switchPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   findErrors()
      Highlights the errors in the Hitori puzzle in a red font.
      
   showSolution()
      Shows the solution to the Hitori puzzle
    
   checkSolution()
      Checks the current user's puzzle to verify whether it contains
      the complete and correct solution.

   drawHitori(numbers, blocks, rating)
      Returns a text string of the HTML code to
      display a Hitori puzzle table based on the contents of
      the numbers, blocks, and rating parameters.
	
*/

var allCells; //global variable 
// run startUp function 
window.onload = startUp;

//function to display the content of puzzle 1
function startUp() {
    document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
    document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers,hitori1Blocks,hitori1Rating);
    var puzzleButtons = document.getElementsByClassName("puzzles");
    for (var i = 0; i < puzzleButtons.length; i++) {
        puzzleButtons[i].onclick = switchPuzzle;
    }
    setupPuzzle(); //call setupPuzzle function
    document.getElementById("check").addEventListener("click",findErrors); //event handler to check solution
    document.getElementById("solve").addEventListener("click",showSolution); //event handler to show solution

}

//function to swap between 3 puzzles
function switchPuzzle(e) {
    if (confirm("You will lose all of your work on the puzzle! Continue?")) {
        var puzzleID = this.id;
        var puzzleTitle = this.value;
        document.getElementById("puzzleTitle").innerHTML = puzzleID;

        switch (puzzleID) {
            case "puzzle1":
                document.getElementById("puzzle").innerHTML =
                    drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
                break;
            case "puzzle2":
                document.getElementById("puzzle").innerHTML =
                    drawHitori(hitori2Numbers, hitori2Blocks, hitori2Rating);
                break;
            case "puzzle3":
                document.getElementById("puzzle").innerHTML =
                    drawHitori(hitori3Numbers, hitori3Blocks, hitori3Rating);
                break;
        }
        setupPuzzle(); //call setupPuzzle function
    }
}
//function to set up features of the puzzle table
function setupPuzzle() {
    var cursorType;
    // creating object selection of all td elements
    allCells = document.querySelectorAll("table#hitoriGrid td");
    for (var i = 0; i < allCells.length; i++ ) {
        allCells[i].style.backgroundColor = "white";
        allCells[i].style.color = "black";
        allCells[i].style.borderRadius = "0";

        // Mouse down event listener
        allCells[i].addEventListener("mousedown",
            function(e) {
            if(e.shiftKey) {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
                e.target.style.borderRadius = "0";
            }
            else if (e.altKey) {
                e.target.style.backgroundColor = "black";
                e.target.style.color = "white";
                e.target.style.borderRadius = "0";
            }
            else {
                e.target.style.backgroundColor = "rgb(101,101,101)";
                e.target.style.color = "white";
                e.target.style.borderRadius = "50%";
            }
            e.preventDefault(); //prevent defult action of the browser

            });

         //for different mouse cursor
        document.addEventListener("mouseover",
            function(e) {
                if(e.shiftKey) {
                    e.target.style.cursor = "url(images/jpf_eraser.png), alias";
                }
                else if (e.altKey) {
                    e.target.style.cursor = "url(images/jpf_block.png), cell";
                }
                else {
                    e.target.style.cursor = "url(images/jpf_circle.png), pointer";
                }
            });

        document.addEventListener("mouseup", checkSolution); //checks whether the puzzle is solved

    }
}

//function to highlight incorrect cells in red font
function findErrors() {
    for (var i = 0; i < allCells.length;i++) {
        if ((allCells[i].className === "blocks" &&
        allCells[i].style.backgroundColor === "rgb(101,101,100)")
        ||
        (allCells[i].className === "circles" &&
            allCells[i].style.backgroundColor === "black")) {
        allCells[i].style.color = "red";
        }
    }
    // remove the hints after 1 second
    setTimeout(
        function() {
            for (var i = 0; i < allCells.length; i++) {
                allCells[i].style.color = "white";
            }
        }
    ,1000);
}



         
/* ================================================================= */

function checkSolution() {
   /* Set the initial solved state of the puzzle to true */
   var solved = true;

   /* Loop through the puzzle cells, exiting when an incorrect
      cell is found, setting the solved variable to false */

   for (var i = 0; i < allCells.length; i++) {
      var cellColor = allCells[i].style.backgroundColor;
      var cellClass = allCells[i].className;

      /* A cell is incorrect if it is in the block class and is not black
         or in the circle class and is not white */
      if ( (cellClass == "blocks" && cellColor !== "black") || 
           (cellClass == "circles" && cellColor !== "rgb(101, 101, 101)")) {
         solved = false;
         break;
      }
   }

   /* If solved is still true after the loop, display an alert box */
   if (solved) alert("Congratulations! You solved the puzzle!");
}

function showSolution () {
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.color = "";
      allCells[i].style.backgroundColor = "";
      allCells[i].style.borderRadius = "";
   };   
}

function drawHitori(numbers, blocks, rating) {

   /* Initial HTML String for the Hitori Puzzle */
   var htmlString = "";

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding 
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character.
  */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles
  */

   var totalRows = numbers.length;
   var totalCols = numbers[0].length;
   htmlString = "<table id='hitoriGrid'>";
   htmlString += "<caption>" + rating + "</caption>";
   

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr>";

      for (var j = 0; j < totalCols; j++) {
         if (blocks[i][j] == "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";

         htmlString += numbers[i][j];
         htmlString +="</td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}