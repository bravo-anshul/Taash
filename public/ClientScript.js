var socket;

var playerArray;

function initialize(){
    connectSocket();

}

function connectSocket(){
    socket = io();

    activateEvents();
}

function activateEvents(){
    console.log("activate events");
    socket.on('recievePlayerArray', function(receivedPlayerArray){
        playerArray = receivedPlayerArray;
        console.log(receivedPlayerArray);
        scene = createScene();
        scene.getEngine().setHardwareScalingLevel(0.5)
        engine.runRenderLoop(function(){
            scene.render();
        });
    });
    
    
}