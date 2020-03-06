"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Tutorial Case

   Author: Dominic Torres
   Date:3/2/20   

   Global Variables
   ================
   
   puzzleCells
      References the TD cells within the Hanjie table grid.
   
   cellBackground
      Stores the current background color of the puzzle
      cells during the mouseover event.
      
      
   Function List
   =============

   init()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   swapPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   setBackground(e)
      Sets the background color of the puzzle cells during the mousedown
      event

   extendBackground(e)
      Extends the background color of the original puzzle cell during
      the mouseenter event.
      
   endBackground()
      Ends the action of extending the cell backgrounds in response to the
      mouseup event.

   drawPuzzle(hint, rating, puzzle)
      Returns a text string of the HTML code to
      display a hanjie Web table based on the contents of
      multi-dimensional array, puzzle.
	
*/

//run the init() function when the page loads
window.onload = init;
var puzzleCells;
var cellBackground;

function init(){
   //insert the title for first puzzle
   document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";

   //Insert the html code
   document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);

   //Add event handlers for the puzzle buttons
   var puzzleButtons = document.getElementsByClassName("puzzles");
   for(var i = 0; i <puzzleButtons.length; i++){
      puzzleButtons[i].onclick = swapPuzzle;
   }
   setupPuzzle();

   document.addEventListener("mouseup", endBackground);
}

function endBackground(){
   //remove the event listener for every puzle cell
   for(var i = 0; i < puzzleCells.length; i++){
      puzzleCells[i].removeEventListener("mouseenter", extendBackground);
      puzzleCells[i].style.cursor = "url(jpf_pencil.png), pointer";
   }

}

function setupPuzzle(){
   //create a query selector that will find every td in the table hanjie grid
   puzzleCells = document.querySelectorAll("table#hanjieGrid td");

   //set the intial color of every cell in the tabel to gold
   for(var i = 0; i < puzzleCells.length; i++){
      puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";
      //set the cell background color in response to the mouse down event
      puzzleCells[i].onmousedown = setBackground;
      //use the pecil image as the cursor
      puzzleCells[i].style.cursor = "url(jpf_pencil.png), pointer";
   }
   var filled = document.querySelectorAll("table#hanjieGrid td.filled");
   var empty = document.querySelectorAll("table#hanjieGrid td.empty");

   //create an event listener
   document.getElementById("peek").addEventListener('click',
      function(){
         //display incorrect white cells pink
         for(var i = 0; i < filled.length; i++){
            if(filled[i].style.backgroundColor === "rgb(255, 255, 255)"){
               filled[i].style.backgroundColor = "rgb(255, 211, 211)";
            }
         }
         //display incorrect white cells pink
         for(var i = 0; i < empty.length; i++){
            if(empty[i].style.backgroundColor === "rgb(101, 101, 101)"){
               empty[i].style.backgroundColor = "rgb(255, 101, 101)";
            }
         }
      }
   );
}

function setBackground(e){
   var cursorType;
   //set the background based on the keyboard key being pressed
   if(e.shiftKey){
      cellBackground = "rgb(233, 207, 29)";
      cursorType = "url(jpf_eraser.png), cell";
   }else if(e.altKey){
      cellBackground = "rgb(255, 255, 255)";
      cursorType = "url(jpf_cross.png), crosshair";
   }else{
      cellBackground = "rgb(101, 101, 101)";
      cursorType = "url(jpf_pencil.png), pointer";
   }

   e.target.style.backgroundColor = cellBackground;

   //create an event listener for every puzzle cell
   for(var i = 0; i < puzzleCells.length; i++){
      puzzleCells[i].addEventListener("mouseenter", extendBackground);
      puzzleCells[i].style.cursor = cursorType;
   }
   //prevent the default action of selecting table text 
   e.preventDefault();
}

function extendBackground(e){
   e.target.style.backgroundColor = cellBackground;
}

function swapPuzzle(e){
   var puzzleID = e.target.id;
 
   var puzzleTitle = e.target.value;
   document.getElementById("puzzleTitle").innerHTML = puzzleTitle;

   switch(puzzleID){
      case "puzzle1":
         document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
         break;
      case "puzzle2":
            document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle2Hint, puzzle2Rating, puzzle2);
            break;
      case "puzzle3":
            document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle3Hint, puzzle3Rating, puzzle3);
            break;
   }
   setupPuzzle();
}




         
/* ================================================================= */

function drawPuzzle(hint, rating, puzzle) {
   
   /* Initial HTML String for the Hanjie Puzzle */
   var htmlString = "";

   /* puzzle is a multidimensional array containing the
      Hanjie puzzle layout. Marked cells are indicated by
      the # character. Empty cells are indicated by an
      empty text string. First, determine the number of rows
      and columns in the puzzle */

   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;

   /* Loop through the rows to create the rowCount array
      containing the totals for each row in the puzzle */

   var rowCount = [];
   var spaceCount;
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;

      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (j === totalCols-1) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
            }
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Loop through the columns to create the colCount array
      containing the totals for each column in the puzzle */

   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (i === totalRows-1) {
               colCount[j] += spaceCount + "<br />";
            }
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Create a Web table with the id, hanjieGrid, containing
      headers with the row and column totals.
      Each marked cell has the class name, marked; each
      empty cell has the class name, empty */

   htmlString = "<table id='hanjieGrid'>";
   htmlString += "<caption>" + hint + " (" + rating + ")</caption>";
   htmlString += "<tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>&nbsp;" + rowCount[i]+"</th>";

      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] === "#") {
            htmlString += "<td  class='filled'></td>";
         }
         else {
            htmlString += "<td class='empty'></td>";
         }
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}