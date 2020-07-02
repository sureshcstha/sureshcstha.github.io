"use strict";

var computerChoice = 0;
var gameOutput = 0;
const scoreboard = {
    player: 0,
    round: 0,
    highScore: 0
};

var instruction_div =  document.getElementById("instructionText");
var result_div =  document.getElementById("resultText");

const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");


function start() {
    resetChoice(); //resets computer play and computer insturction when start button gets clicked

    resetGame(); //resets scoreboard and game when start button gets clicked
        
    //Timer for 1 minutes
	var minsLeft = 1;
	var current_time = Date.parse(new Date());
	var deadline = new Date(current_time + minsLeft*60*1000);


	function time_remaining(endtime){
		var t = Date.parse(endtime) - Date.parse(new Date());
		var seconds = Math.floor( (t/1000) % 60 );
		var minutes = Math.floor( (t/1000/60) % 60 );
		return {'total':t, 'minutes':minutes, 'seconds':seconds};
    }
    
	function run_clock(id,endtime){
		var clock = document.getElementById(id);
		function update_clock(){
			var t = time_remaining(endtime);
			clock.innerHTML = 'Time Remaining: '+t.minutes+':'+t.seconds;
			if(t.total<=0){ clearInterval(timeinterval); alert("Time is up. Your Score: " + scoreboard.player + " Highest Score: " + scoreboard.highScore);}
		}
		update_clock(); // run function once at first
		var timeinterval = setInterval(update_clock, 1000); //runs the update_clock function every second
    }

    function stopClock() {
        clearInterval(timeinterval);
      }

    function checkTimer() {
        if (t.total == 0) stopClock();
    }

    run_clock('clockdiv',deadline);
    checkTimer(); // checks if there is any time left
}
    

// game output to win, ties, or lose and give insturction to the player
function gameOP() {
    if(gameOutput == 0) {
        gameOutput= "win";
        instruction_div.innerHTML = "Computer says: Win the game.";
    }
    else if (gameOutput ==1) {
        gameOutput ="lose";
        instruction_div.innerHTML = "Computer says: Lose the Game.";
    } else if (gameOutput ==2) {
        gameOutput ="tie";
        instruction_div.innerHTML = "Computer says: Tie the Game.";
    }
}
	
var userChoice = null; //when clicked on

//add listeners to div 
rock_div.addEventListener("click" , function(){
    document.getElementById('playerChoice').src= 'images/rock.jpg';
    game("rock");

});
paper_div.addEventListener("click" , function(){
    document.getElementById('playerChoice').src= 'images/paper.jpg';
    game("paper");

});
scissors_div.addEventListener("click",function(){
    document.getElementById('playerChoice').src= 'images/scissors.jpg';
    game("scissors");

});

//function to make computer choice and give win/los/draw instruction
function resetChoice() {
    computerChoice = Math.floor(Math.random()* 3); 
    compPlay();//comp chooses r, p, s
    gameOutput = Math.floor(Math.random() * 3); 
    gameOP(); //comp choice of win, lose or draw
}
    

// function to make the user choice and check if they made correct choice
function game(userChoice) {
    if(gameOutput == "win") {
    //call winGame function
        winGame(userChoice);
    } else if (gameOutput=="lose") {
    //call loseGame function
        loseGame(userChoice);
    } else if (gameOutput=="tie") {
    //call drawGame function
        drawGame(userChoice);
    }
    resetChoice();
}

//function to choice r, p, s for computer
function compPlay() {
    if (computerChoice == 0) {
        computerChoice = "rock";
        document.getElementById('computerChoice').src= 'images/rock.jpg';
        
    } else if (computerChoice == 1) {
        computerChoice = "paper";
        document.getElementById('computerChoice').src= 'images/paper.jpg';
        
    } else {
        computerChoice = "scissors"; 
        document.getElementById('computerChoice').src= 'images/scissors.jpg';     
    }
}

//function for gameOutput = win
function winGame(userChoice) {
    if(userChoice == "rock" && computerChoice == "scissors") {
        //player gets +10 points
        result_div.innerHTML ="Rock wins over Scissors. +10 points.";
        scoreboard.player += 10;
        scoreboard.round++;
    } else if (userChoice == "paper" && computerChoice == "rock") {
        //player gets +10 points
        result_div.innerHTML ="Paper wins over Rock. +10 points.";
        scoreboard.player += 10;
        scoreboard.round++;
    } else if (userChoice == "scissors" && computerChoice == "paper") {
        //player gets +10 points
        result_div.innerHTML ="Scissors wins over Paper. +10 points.";
        scoreboard.player += 10;
        scoreboard.round++;
    } else {
        //player doubly penalized, -20 points
        result_div.innerHTML ="INCORRECT! -20 points";
        scoreboard.player -= 20;
        scoreboard.round++;
    }
    score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Round: ${scoreboard.round}</p>
        <p>High Score: ${scoreboard.highScore}</p>`;

    checkHighScore();
}

//function for gameOutput = lose
function loseGame(userChoice) {
    if(userChoice == "rock" && computerChoice == "paper") {
        //player gets +10 points
        result_div.innerHTML = "Rock loses over Paper. +10 points."
        scoreboard.player += 10;
        scoreboard.round++;
    } else if (userChoice == "paper" && computerChoice == "scissors") {
        //player gets +10 points
        result_div.innerHTML ="Paper loses over Scissors. +10 points.";
        scoreboard.player += 10;
        scoreboard.round++;
    } else if (userChoice == "scissors" && computerChoice == "rock") {
        //player gets +10 points
        result_div.innerHTML = "Scissors loses over Rock. +10 points.";
        scoreboard.player += 10;
        scoreboard.round++;
    } else {
        //player doubly penalized, -20 points
        result_div.innerHTML = "INCORRECT! -20 points";
        scoreboard.player -= 20;
        scoreboard.round++;
    }
    score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Round: ${scoreboard.round}</p>
        <p>High Score: ${scoreboard.highScore}</p>`;
        
    checkHighScore();
}

//function for gameOutput = tie
function drawGame(userChoice) {
    if(userChoice == computerChoice) {
        //player gets +10 points
        result_div.innerHTML = "There was a tie! +10 points."
        scoreboard.player += 10;
        scoreboard.round++;
    } else {
        //player doubly penalized, -20 points
        result_div.innerHTML = "INCORRECT! -20 points";
        scoreboard.player -= 20;
        scoreboard.round++;
    }
    score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Round: ${scoreboard.round}</p>
        <p>High Score: ${scoreboard.highScore}</p>`;
    
    checkHighScore();
}

//function to get the high score 
function checkHighScore(){
    if (scoreboard.player > scoreboard.highScore) {
        scoreboard.highScore = scoreboard.player;
      }
}


 //game reset function
function resetGame() {
    scoreboard.player = 0;
    scoreboard.round = 0;
    scoreboard.highScore = 0;
    document.getElementById('playerChoice').src= 'images/human.jpg';
    result_div.innerHTML = "If you win: +10 points.  If you lose: -20 points.";
    score.innerHTML = `
      <p>Player: 0</p>
      <p>Round: 0</p>
      <p>High Score: 0</p>`;
  }

