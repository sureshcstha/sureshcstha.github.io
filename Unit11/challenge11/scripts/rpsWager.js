"use strict";

const scoreboard = {
    player: 500,
    round: 0,
    highScore: 500
};
var bet = 0;
var oldBet;
var my_array = [1,2,3,4,5,6,7,8,9]; 

var is_draw = false;

const input_bet = document.getElementById("bet");
var TiedComputer = document.getElementById("tiedComputer");

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
    var computerAction = randomChoice();
    
    bet = parseInt(input_bet.value);

    if(computerAction==userAction){ 
        //draw
        oldBet = bet;
        win = -1;
        scoreboard.round++;

    }else if((userAction=="paper"&&computerAction=="rock")||
                (userAction=="rock"&&computerAction=="scissors")||
                (userAction=="scissors"&&computerAction=="paper")){
                //user win
                scoreboard.player = scoreboard.player + bet;
                scoreboard.round++;
                win =1;
    }else{ 
    //lose
        //scoreboard.bet++;
        scoreboard.player = scoreboard.player - bet;
        scoreboard.round++;
        win=0;
        
    }
    score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Round: ${scoreboard.round}</p>
        <p>Highest Balance: ${scoreboard.highScore}</p>`;
    
    //displays win/lose/draw comparing "player choice" and "computer cohoice"
    updateUI(win,computerAction,userAction);

    //gives alert window when 9 rounds are complete and displayes scores and high score
    if (scoreboard.round == 9) {
        alert("Game Over! Your Balance: $" + scoreboard.player + " Highest Balance: $" + scoreboard.highScore);
    }

    //checks players highest balance
    if (scoreboard.player > scoreboard.highScore) {
      scoreboard.highScore = scoreboard.player;
    }
}

//function to choose randomly 3rock/ 3paper /3scissors
function randomChoice() {
    var ri = Math.floor(Math.random() * my_array.length);
    console.log(my_array[ri]);
    var rs = my_array.splice(ri, 1); 
    console.log(my_array);
    
    if ((rs == 1)||(rs == 2)||(rs == 3)) {
    document.getElementById('computerChoice').src= 'images/rock.jpg';
    return "rock";
    } else if ((rs == 4)||(rs == 5)||(rs == 6)) {
    document.getElementById('computerChoice').src= 'images/paper.jpg';
    return "paper";
    }else if ((rs == 7)||(rs == 8)||(rs == 9)) {
    document.getElementById('computerChoice').src= 'images/scissors.jpg';
    return "scissors";
    }
}

//function to display win/lose/draw message
 function updateUI(win,computerAction,userAction){
    var result = "Computer choose "+ computerAction;
    if(win==1){
        result = result +", you Win!!!";
    }else if(win == 0){
        result =result +", you Lost!";
    }else if(win == -1){
        result = "!! DRAW !! You must at least DOUBLE your next bet! Min Bet = " + parseInt(2*oldBet);
    }
    result_div.innerHTML = result;
}

main();

//game reset function
function restartGame() {
    scoreboard.player = 500;
    scoreboard.round = 0;
    my_array = [1,2,3,4,5,6,7,8,9]; 
    document.getElementById('playerChoice').src= 'images/human.jpg';
    document.getElementById('computerChoice').src= 'images/computer.jpg';
    result_div.innerHTML = "Score has been reset! Let's see who wins this time!";
    score.innerHTML = `
      <p>Player: 500</p>
      <p>Round: 0</p>
      <p>Highest Balance: 500</p>`;
  }

restart.addEventListener('click', restartGame);


