var socket ;

var playerArray;
var playerId;

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
            scene = createScene();
            //scene.getEngine().setHardwareScalingLevel(0.5)
            engine.runRenderLoop(function(){
                scene.render();
            });
        }
    });

    socket.on('cardPlayed', function(cardValue){
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
    });

}

function arrayLeftShift(arr, num){
    arr = arr.concat(arr.splice(0,num));
    return arr;
}

function demoFunction(){
    console.log("demoFunction");
    text1.text = "new";
}

