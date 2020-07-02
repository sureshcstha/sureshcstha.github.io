"use strict";

const scoreboard = {
    player: 0,
    round: 0,
    computer: 0
  };

const result_div =  document.getElementById("resultText");

const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");

//add listeners to div 
//player chooses between rock/paper/scissors
function main(){
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
    
}

//decides winner and updates the scoreboard
function game(userAction){
    var win =0;
    const computerAction = randomChoice();
    if(computerAction==userAction){ 
        //draw
        win = -1;
        scoreboard.round++;
    }else if((userAction=="paper"&&computerAction=="rock")||
                (userAction=="rock"&&computerAction=="scissors")||
                (userAction=="scissors"&&computerAction=="paper")){
                //user win
                scoreboard.player++;
                scoreboard.round++;
                win =1;
    }else{ 
    //lose
        scoreboard.computer++;
        scoreboard.round++;
        win=0;
    }
    score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Round: ${scoreboard.round}</p>
        <p>Computer: ${scoreboard.computer}</p>`;

    //displays win/lose/draw comparing "player choice" and "computer cohoice"
    updateUI(win,computerAction,userAction); 

    //when 5 rounds gets played, displayes alert window
    if (scoreboard.round == 5) {
        alert("Game Over! Player Score: " + scoreboard.player  + " Computer Score: " + scoreboard.computer);
        if (scoreboard.player > scoreboard.computer)
            alert("Player Wins! Click the restart button to play a new game.");
        else if (scoreboard.computer > scoreboard.player){
            alert("Computer Wins! Click the restart button to play a new game.");
        }
        else{
            alert("It is a tie! Click the restart button to play a new game.");
        }

      }
}

//function for computer to chooses between rock, paper and scissors
function randomChoice() {
    const rand = Math.floor(Math.random() * 3);
    if (rand == 0) {
      document.getElementById('computerChoice').src= 'images/rock.jpg';
      return "rock";
    } else if (rand == 1) {
      document.getElementById('computerChoice').src= 'images/paper.jpg';
      return "paper";
    } else {
      document.getElementById('computerChoice').src= 'images/scissors.jpg';
      return "scissors";
    }
  }

  //function to decide win/lose/draw message
  function updateUI(win,computerAction,userAction){
    var result = "Computer choose "+ computerAction;
    if(win==1){
        result = result +", you Win!!!";
    }else if(win == 0){
        result =result +", you Lost!";
    }else{
        result ="!! DRAW !!";
    }
    result_div.innerHTML = result;
}
main();

//game reset function
function restartGame() {
    scoreboard.player = 0;
    scoreboard.round = 0;
    scoreboard.computer = 0;
    document.getElementById('playerChoice').src= 'images/human.jpg';
    document.getElementById('computerChoice').src= 'images/computer.jpg';
    result_div.innerHTML = "Score has been reset! Let's see who wins this time!";
    score.innerHTML = `
      <p>Player: 0</p>
      <p>Round: 0</p>
      <p>Computer: 0</p>`;
  }

restart.addEventListener('click', restartGame);
