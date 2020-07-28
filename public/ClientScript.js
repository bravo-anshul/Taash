var socket;

var playerArray;
var playerId;

var playerObjectArray = [];
var cardsRestricitonArray = [];

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
    console.log("player id is :-" + playerId);
  });

  socket.on('recievePlayerArray', function (receivedPlayerArray) {
    if (playerArray == null) {
      playerArray = arrayLeftShift(receivedPlayerArray, playerId);
      initializeCards();
    }
    else{
      resetCards();
    }
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

}

function playerMove(moveData) {
  updateText(moveData.playerTurn);
  cardsRestricitonArray = moveData.cardsRestricitonArray;
  if (moveData.playerTurn == playerId) {
    if (!checkIfAnyCardPlayable()) {
      console.log("playerSkipped");
      socket.emit('playerMove', { cardValue: 0, playerId : playerId });
    }
  }
  if (moveData.cardValue != 0)
    playCard(moveData.cardValue);
}

function updateText(currentPlayerTurn) {
  for (var i = 0; i < 4; i++) {
    if (i == currentPlayerTurn)
      playerNameArray[i].color = 'white';
    else
      playerNameArray[i].color = 'black';
  }
}

function checkIfAnyCardPlayable() {
  var isPlayable = false;
  playerArray[0].cardArray.forEach(cardValue => {

    if (checkIfCardPlayable(getServerCardValue(cardValue))){
      //cardToPlay = getServerCardValue(cardValue);
      
      socket.emit('playerMove',getServerCardValue(cardValue));
      isPlayable = true;
    }
  });
  return isPlayable;
}

function checkIfCardPlayable(cardValues) {
  switch (cardValues.skin) {
    case "heartCardSkin":
      if (cardValues.value <= 7) {
        if (cardValues.value == (cardsRestricitonArray[0] - 1)) {
          return true;
        }
      }
      else if (cardsRestricitonArray[0] != 8) {
        if (cardValues.value == (cardsRestricitonArray[1] + 1)) {
          return true;
        }
      }
      break;
    case "spadeCardSkin":
      if (cardValues.value <= 7) {
        if (cardValues.value == (cardsRestricitonArray[2] - 1)) {
          return true;
        }
      }
      else if (cardsRestricitonArray[2] != 8) {
        if (cardValues.value == (cardsRestricitonArray[3] + 1)) {
          return true;
        }
      }
      break;
    case "clubCardSkin":
      if (cardValues.value <= 7) {
        if (cardValues.value == (cardsRestricitonArray[4] - 1)) {
          return true;
        }
      }
      else if (cardsRestricitonArray[4] != 8) {
        if (cardValues.value == (cardsRestricitonArray[5] + 1)) {
          return true;
        }
      }
      break;
    case "diamondCardSkin":
      if (cardValues.value <= 7) {
        if (cardValues.value == (cardsRestricitonArray[6] - 1)) {
          return true;
        }
      }
      else if (cardsRestricitonArray[6] != 8) {
        if (cardValues.value == (cardsRestricitonArray[7] + 1)) {
          return true;
        }
      }
      break;

  }

  return false;
}

function addPlayerName() {
  var playerName = document.getElementById("nameInput").value;
  if (playerName.length < 2) {
    alert("Please enter more than 2 characters");
    return;
  }
  document.getElementById("welcomeDialog").style.display = 'none';
  socket.emit('addPlayerName', playerId, playerName);
}

function playCard(cardValue) {
  var playerFound;
  var cardFound;
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

function demoFunction() {
  console.log("demoFunction");

  //Tutor1();
  var count = 1;
  for(var i=0;i<13;i++){
    firstPlayerCardArray[i].updateCardValues(count++);
    secondPlayerCardArray[i].updateCardValues(count++);
    thirdPlayerCardArray[i].updateCardValues(count++);
    fourthPlayerCardArray[i].updateCardValues(count++);
  }
}

function demoFunction2(){
  socket.emit('restartGame');
}

