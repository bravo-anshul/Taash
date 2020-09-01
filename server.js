var express = require('express');

var playerClass = require('./PlayerClass.js');
const { player } = require('./PlayerClass.js');

var app = express();
app.use(express.static('public'));
var port = process.env.PORT || 2000;

var server = app.listen(port, function () {
  console.log("server running on port 2000.")
});
var io = require('socket.io')(server);

var playersArray = [];
var playersNameArray = [];
var cardsRestricitonArray = [];
var currentPlayerTurn;
var lastCardPlayed = false;
var gamesPlayed = 0;
//  0 = heartTop , 1 = heartBottom, 2 = spade , 4 = club , 6 = diamond

io.sockets.on('connection',

  function (socket) {
    console.log("We have a new client: " + socket.id);

    var newPlayer = new playerClass.player(socket.id, playersArray.length);
    socket.emit('newClientConnect', playersArray.length);

    // playersArray.push(newPlayer);
    // newPlayer = new playerClass.player(socket.id,playersArray.length);
    // playersArray.push(newPlayer);
    // newPlayer = new playerClass.player(socket.id,playersArray.length);
    // playersArray.push(newPlayer);
    // newPlayer = new playerClass.player(socket.id,playersArray.length);

    playersArray.push(newPlayer);
    console.log("playerCount is :" + playersArray.length);

    if (playersArray.length >= 4) {
      distributeCards();
      setFirstPlayer();
      cardsRestricitonArray = [8, 7, 8, 7, 8, 7, 8, 7];
    }

    socket.on('cardPlayed',
      function (cardValue) {
        if(checkIfCardPlayable(cardValue)){
        io.sockets.emit('cardPlayed', cardValue.numericCardValue);
        }
      }
    );
    socket.on('playerMove',
      function (moveData) {
        if(moveData.playerId == currentPlayerTurn)
          if (checkIfCardPlayable(moveData)){
            checkIfLastCardPlayed(moveData.playerId);
            io.sockets.emit('playerMove', { cardValue: moveData.numericCardValue, 
                                            playerTurn: getPlayerTurn(), 
                                            cardsRestricitonArray: cardsRestricitonArray,
                                            lastCardPlayed : lastCardPlayed                                          
                                          });
          }
          else if(moveData.cardValue == 0) {
            io.sockets.emit('playerMove', { cardValue: 0, 
                                            playerTurn: getPlayerTurn(), 
                                            cardsRestricitonArray: cardsRestricitonArray,
                                            lastCardPlayed : lastCardPlayed
                                          });
         }
      }
    );

    // socket.on('playerMove',
    //   function (moveData) {
    //     //checkIfLastCardPlayed(moveData.playerId);
    //         io.sockets.emit('playerMove', { cardValue: moveData.numericCardValue, 
    //                                         playerTurn: getPlayerTurn(), 
    //                                         cardsRestricitonArray: cardsRestricitonArray,
    //                                         lastCardPlayed : lastCardPlayed                                          
    //                                       });
    //                                     });

    socket.on('addPlayerName', function (countId, playerName) {
      playersArray.forEach(function (player) {
        if (player.playerCount == countId) {
          player.name = playerName;
        }
      });
      playersNameArray[countId] = playerName;
      //io.sockets.emit("writePlayerNames",{playerId : countId, playerName : playerName});
      io.sockets.emit("writePlayerNames", playersNameArray);

    });

    socket.on('disconnect', function () {
      console.log("Client Disconnected :" + socket.id);
      removePlayer(socket.id);
    });

    socket.on('restartGame', function(){
      restartGame();
    });

    socket.on('getRemainingCardCount', function(scoreData){
      updateScore(scoreData);
    });

  }

);

function restartGame(){
  setCardCountToZero();
  distributeCards();
  setFirstPlayer();      
}

function checkGameCount(){
  console.log("game numner"+gamesPlayed);
  if(gamesPlayed > 3){
    newGame();
  }
  else{
    io.sockets.emit('updateScore',scoreDataArray);
    setTimeout(function() { restartGame(); }, 10000);
    gamesPlayed+=1;
    updateScoreCount = 0;
    scoreDataArray = [];
    lastCardPlayed = false;
    cardsRestricitonArray = [8, 7, 8, 7, 8, 7, 8, 7];
  }
}

function setCardCountToZero(){
  playersArray.forEach(function(player){
    player.cardPlayed = 0;
  });
}

function newGame(){
  console.log("isnide new ga,e");
  io.sockets.emit('displayFinalResult',scoreDataArray);
  gamesPlayed = 0;
  resetPlayereScore();
  setTimeout(function() { restartGame(); }, 20000);
  //restartGame();
}

function resetPlayereScore(){
  playersArray.forEach(function(player){
    player.score = 0;
  });
}

function removePlayer(disconnectedSocketId) {

  for (var index = 0; index < playersArray.length; index++) {
    if (playersArray[index].socketId == disconnectedSocketId) {
      playersArray.splice(index, 1);
      playersNameArray.splice(index, 1);
      break;
    }
  }
  console.log("playerCount is :" + playersArray.length);
}


function distributeCards() {
  var cardsArray = [];
  for (var i = 1; i < 53; i++) {
    cardsArray.push(i);
  }
  cardsArray = shuffleArray(cardsArray);

  playersArray[0].cardArray = cardsArray.slice(0, 13);
  playersArray[1].cardArray = cardsArray.slice(13, 26);
  playersArray[2].cardArray = cardsArray.slice(26, 39);
  playersArray[3].cardArray = cardsArray.slice(39, 52);
  console.log(cardsArray);
  io.sockets.emit('recievePlayerArray', playersArray);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function setFirstPlayer() {
  var flag = false;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 13; j++) {
      if (playersArray[i].cardArray[j] == 7) {
        currentPlayerTurn = playersArray[i].playerCount;
        break;
      }
    }
    if (flag)
      break;
  }
  console.log("cureent player :" + currentPlayerTurn);
  io.sockets.emit('playerTurn', currentPlayerTurn);
}

function checkIfLastCardPlayed(playerCountId){
  if(playersArray[playerCountId].cardPlayed == 12){
    lastCardPlayed = true;
  }
  else{
    playersArray[playerCountId].cardPlayed+=1;
  }
}

function getPlayerTurn() {
  
  if (currentPlayerTurn == 3) {
    currentPlayerTurn = 0;
  }
  else {
    currentPlayerTurn += 1;
  }
  
  if(lastCardPlayed){
    currentPlayerTurn = 99;
  }
  return currentPlayerTurn;
}


function checkIfCardPlayable(cardValues) {

  if (cardValues == 0)
    return false;

  switch (cardValues.skin) {
    case "heartCardSkin":
      if (cardValues.value <= 7) {
        if (cardValues.value == (cardsRestricitonArray[0] - 1)) {
          cardsRestricitonArray[0] = cardValues.value;
          return true;
        }
      }
      else if (cardsRestricitonArray[0] != 8) {
        if (cardValues.value == (cardsRestricitonArray[1] + 1)) {
          cardsRestricitonArray[1] = cardValues.value;
          return true;
        }
      }
      break;
    case "spadeCardSkin":
      if (cardValues.value <= 7) {
        if (cardValues.value == (cardsRestricitonArray[2] - 1)) {
          cardsRestricitonArray[2] = cardValues.value;
          return true;
        }
      }
      else if (cardsRestricitonArray[2] != 8) {
        if (cardValues.value == (cardsRestricitonArray[3] + 1)) {
          cardsRestricitonArray[3] = cardValues.value;
          return true;
        }
      }
      break;
    case "clubCardSkin":
      if (cardValues.value <= 7) {
        if (cardValues.value == (cardsRestricitonArray[4] - 1)) {
          cardsRestricitonArray[4] = cardValues.value;
          return true;
        }
      }
      else if (cardsRestricitonArray[4] != 8) {
        if (cardValues.value == (cardsRestricitonArray[5] + 1)) {
          cardsRestricitonArray[5] = cardValues.value;
          return true;
        }
      }
      break;
    case "diamondCardSkin":
      if (cardValues.value <= 7) {
        if (cardValues.value == (cardsRestricitonArray[6] - 1)) {
          cardsRestricitonArray[6] = cardValues.value;
          return true;
        }
      }
      else if (cardsRestricitonArray[6] != 8) {
        if (cardValues.value == (cardsRestricitonArray[7] + 1)) {
          cardsRestricitonArray[7] = cardValues.value;
          return true;
        }
      }
      break;

  }

  return false;
}

var updateScoreCount = 0;
var scoreDataArray = [];

function updateScore(scoreData){
  updateScoreCount+=1;
  playersArray.forEach(function(player){
    if(player.playerCount == scoreData.playerId){
      player.score += scoreData.points;
      var tempScoreData = {playerId : scoreData.playerId, totalScore : player.score, currentScore : scoreData.points};
      scoreDataArray.push(tempScoreData);
    }
  });
  if(updateScoreCount == 4){
    scoreDataArray.sort(function (a, b) {
      return a.currentScore - b.currentScore;
    });
  
    console.log(scoreDataArray);
    checkGameCount();
  }
} 