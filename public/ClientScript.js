var socket ;

var playerArray;
var playerId;

var playerObjectArray = [];

function initialize(){
    connectSocket();
}

function connectSocket(){
    socket = io();

    activateEvents();
}

function activateEvents(){

    socket.on('newClientConnect', function(currentPlayerId){
        playerId = currentPlayerId;
    });

    socket.on('recievePlayerArray', function(receivedPlayerArray){
        if(playerArray == null){
            playerArray = arrayLeftShift(receivedPlayerArray,playerId);
            initializeCards();
        }
    });

    socket.on('writePlayerNames', function(nameData){
        writePlayerName(nameData);
    });

    socket.on('cardPlayed', function(cardValue){
        playCard(cardValue);
    });

}

function addPlayerName(){
	var playerName = document.getElementById("nameInput").value;
	if(playerName.length < 2){
		alert("Please enter more than 2 characters");
		return;
	}
	document.getElementById("welcomeDialog").style.display = 'none';
	socket.emit('addPlayerName', playerId, playerName);
}

function playCard(){
    var playerFound;
    var cardFound;
    var flag = false;
    for(var i = 0; i<4; i++){
        for(var j=0;j<13;j++){
            if(playerArray[i].cardArray[j] == cardValue){
                console.log(i+" : player played");
                playerFound = i;
                cardFound = j;
                flag = true;
                break;
            } 
        }
        if(flag)
            break;
    }

    if(i == 0 ){
        firstPlayerCardArray[j].playReturnAnimation();
    }
    else if(i == 1 ){
        secondPlayerCardArray[j].playReturnAnimation();
    }
    else if(i == 2 ){
        thirdPlayerCardArray[j].playReturnAnimation();
    }
    else if(i == 3 ){
        fourthPlayerCardArray[j].playReturnAnimation();
    }    
}


function arrayLeftShift(arr, num){
    arr = arr.concat(arr.splice(0,num));
    return arr;
}

function initializeCards(){
    initilizeFirstPlayer();
    initilizeSecondPlayer();
    initilizeThirdPlayer();
    initilizeFourthPlayer();
}

function demoFunction(){
    console.log("demoFunction");
    
    Tutor1();
    getText();

}

