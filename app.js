/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, roundScore, activePlayer, dice, gamePlaying, lastDice;
init();
//dice roll
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    //random number generator
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    //result display
    displayDice();
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
    if(dice1 !== 1 && dice2 !== 1) {
      //update score
      roundScore +=  dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
      //change player
      nextPlayer();
    }
    /*
    if( dice === 6 && lastDice ===6) {
      //player looses
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();
    }else if(dice !== 1) {
      //update score
      roundScore +=  dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
      //change player
      nextPlayer();
    }
    lastDice = dice;
    */
  }
});
//hold logic
document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying){
    //add current player score to global score
    scores[activePlayer] += roundScore;
    //update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    let input, winningScore;
      input = document.querySelector('.w-point').value;
      if(input) {
        winningScore = input;
      }else{
        winningScore = 100;
      }
    //determine winner
    if(scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = "Winner!";
      hideDice();
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});
//new game button
document.querySelector('.btn-new').addEventListener('click', init);
//game initialization function
function init () {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  hideDice();
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
}
//display dice
function displayDice () {
  document.getElementById('dice-1').style.display = 'block';
  document.getElementById('dice-2').style.display = 'block';
}
//hide dice
function hideDice() {
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}
//next player function
function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  hideDice();
}
