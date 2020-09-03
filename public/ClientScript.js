var socket;

var playerArray;
var playerId;
var currentPlayerTurn;
var fullScreenBoolean=false;

var playerObjectArray = [];

function initialize() {
  connectSocket();
}

function connectSocket() {
  socket = io();

  activateEvents();
}
function activateEvents() {

  socket.on('newClientConnect', function (currentPlayerId) {
    playerId = currentPlayerId;
  });

  socket.on('recievePlayerArray', function (receivedPlayerArray) {
    receivePlayerArray(receivedPlayerArray);
  });

  socket.on('writePlayerNames', function (nameData) {
    writePlayerName(nameData);
  });

  socket.on('playerTurn', function (currentPlayerTurn) {
    updateText(currentPlayerTurn);
  });

  socket.on('playerMove', function (moveData) {
    playerMove(moveData);
  });

  socket.on('cardPlayed', function (cardValue) {
    playCard(cardValue);
  });

  socket.on('writeScore', function(scoreData){
    writeScore(scoreData);
  });

  socket.on('updateScore', function(scoreData){
    writeScore(scoreData);
    updateScoreBoard(scoreData);
  });

  socket.on('displayFinalResult', function(scoreDataArray){
    updateFinalScoreBoard(scoreDataArray);
    resetScore(scoreDataArray);
  });

}

function receivePlayerArray(receivedPlayerArray){
    if (playerArray == null) {
      playerArray = arrayLeftShift(receivedPlayerArray, playerId);
      initializeCards();
    }
    else{
      playerArray = arrayLeftShift(receivedPlayerArray, playerId);
      resetCards();
    }
}

function playerMove(moveData) {
  updateText(moveData.playerTurn);
  checkIfLastCardPlayed(moveData.lastCardPlayed);
  cardsRestricitonArray = moveData.cardsRestricitonArray;
  if (moveData.playerTurn == playerId) {
    if (!checkIfAnyCardPlayable())  {
      console.log("playerSkipped");
      displaySkipImage();
      socket.emit('playerMove', { cardValue: 0, playerId : playerId });
    }
  }
  if (moveData.cardValue != 0){
    playCard(moveData.cardValue);
  }
  
}

function updateText(currentPlayerTurn) {
  for (var i = 0; i < 4; i++) {
    if (i == currentPlayerTurn)
      playerNameArray[i].color = 'white';
    else
      playerNameArray[i].color = 'black';
  }
}

function checkIfLastCardPlayed(lastCardPlayed){
  if(lastCardPlayed){
    console.log("GAME OVER");
    giveRemainingCardCount();
  }
}

function checkIfAnyCardPlayable() {
  var isPlayable = false;

  firstPlayerCardArray.forEach(function(card){

    if (checkIfCardPlayable(getServerCardValue(card.getCardValue()))){
      isPlayable = true;
    }
  });
  return isPlayable;
}

function addPlayerName() {
  if(!fullScreenBoolean){
    alert("Please open in FullScreen");
    return;
  }
    
  var playerName = document.getElementById("nameInput").value;
  if (playerName.length < 2) {
    alert("Please enter more than 2 characters");
    return;
  }
  document.getElementById("welcomeDialog").style.display = 'none';
  //document.getElementById('playerNameText').innerHTML = playerName+" "+playerId;
  socket.emit('addPlayerName', playerId, playerName);
}

function playCard(cardValue) {
  var flag = false;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 13; j++) {
      if (playerArray[i].cardArray[j] == cardValue) {
        playerFound = i;
        cardFound = j;
        flag = true;
        break;
      }
    }
    if (flag)
      break;
  }

  if (i == 0) {
    firstPlayerCardArray[j].playReturnAnimation();
  }
  else if (i == 1) {
    secondPlayerCardArray[j].playReturnAnimation();
  }
  else if (i == 2) {
    thirdPlayerCardArray[j].playReturnAnimation();
  }
  else if (i == 3) {
    fourthPlayerCardArray[j].playReturnAnimation();
  }
}

function arrayLeftShift(arr, num) {
  arr = arr.concat(arr.splice(0, num));
  arr[0].cardArray.sort(function (a, b) {
    return a - b;
  });
  return arr;
}

function resetCards(){
  cardsRestricitonArray = [8, 7, 8, 7, 8, 7, 8, 7];
  for(var i=0;i<13;i++){
    firstPlayerCardArray[i].updateCardValues(playerArray[0].cardArray[i]);
    secondPlayerCardArray[i].updateCardValues(playerArray[1].cardArray[i]);
    thirdPlayerCardArray[i].updateCardValues(playerArray[2].cardArray[i]);
    fourthPlayerCardArray[i].updateCardValues(playerArray[3].cardArray[i]);
  }
  Tutor1();
}

function initializeCards() {
  
  initilizeFirstPlayer();
  initilizeSecondPlayer();
  initilizeThirdPlayer();
  initilizeFourthPlayer();

}

function giveRemainingCardCount(){
  var points = 0;
  firstPlayerCardArray.forEach(function(card){
    if(card.getCardPlayedBoolean() == false){
      points += getCardPlayingValue(card.getCardValue());
    }
  });
  console.log(points);
  socket.emit('getRemainingCardCount',{playerId : playerId,  points : points});
}

function demoFunction() {
  console.log("demoFunction");

  Tutor1();
}

function demoFunction2(){
  socket.emit('restartGame');
}
