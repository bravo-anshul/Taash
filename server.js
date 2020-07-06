var express = require('express');

var playerClass = require('./PlayerClass.js');
const { player } = require('./PlayerClass.js');

var app = express();
app.use(express.static('public'));
var port = process.env.PORT || 2000;

var server = app.listen(port, function(){
    console.log("server running on port 2000.")
});
var io = require('socket.io')(server);

var playersArray = [];


io.sockets.on('connection',
    
  function (socket) {
    console.log("We have a new client: " + socket.id);

    var newPlayer = new playerClass.player(socket.id);
    playersArray.push(newPlayer);
    newPlayer = new playerClass.player(socket.id);
    playersArray.push(newPlayer);
    newPlayer = new playerClass.player(socket.id);
    playersArray.push(newPlayer);
    newPlayer = new playerClass.player(socket.id);
    playersArray.push(newPlayer);

    console.log(playersArray.length);

    if(playersArray.length >= 1){
      distributeCards();
    }

    socket.on('disconnect', function() {
      console.log("Client Disconnected :" + socket.id);
    });


  }

);

function distributeCards(){
    var cardsArray = [];
    for(var i=1;i<53;i++){
      cardsArray.push(i);
    }
    cardsArray = shuffleArray(cardsArray);
    
    playersArray[0].cardArray = cardsArray.slice(0,13);
    playersArray[1].cardArray = cardsArray.slice(13,26);
    playersArray[2].cardArray = cardsArray.slice(26,39);
    playersArray[3].cardArray = cardsArray.slice(39,52);
    console.log(playersArray);
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