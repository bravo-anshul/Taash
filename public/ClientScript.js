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
            console.log(receivedPlayerArray);
            playerArray = shiftArrayToRight(receivedPlayerArray,playerId);
            console.log(playerArray);
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
            console.log(i+" : player played");
            firstPlayerCardArray[j].playReturnAnimation();
        }
        else if(i == 1 ){
            console.log(i+" : player played");
            secondPlayerCardArray[j].playReturnAnimation();
        }
        else if(i == 2 ){
            console.log(i+" : player played");
            thirdPlayerCardArray[j].playReturnAnimation();
        }
        else if(i == 3 ){
            console.log(i+" : player played");
            fourthPlayerCardArray[j].playReturnAnimation();
        }
    });

}

function shiftArrayToRight(arr, places) {
    for (var i = 0; i < places; i++) {
        arr.unshift(arr.push());
    }
    return arr;
}

function setPlayerPosition(nums,k){
    if(nums.length > k){
        nums.unshift( ...nums.splice(-k));
    } else {
       let i = 0;
        while(i < k){
        nums.unshift(nums.splice(-1));
        i++;
        }
    }
    return nums;
}

function demoFunction(){
    console.log("demoFunction");
    socket.emit('cardPlayed', 34);
}

