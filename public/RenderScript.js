var canvas = document.getElementById("renderCanvas"); 

var engine = new BABYLON.Engine(canvas, true);
var scene;
var shadowGenerator;
var shadowGenerator2;

var firstPlayerCardArray = [];
var secondPlayerCardArray = [];
var thirdPlayerCardArray = [];
var fourthPlayerCardArray = [];

var playerNameArray = [];
var nameData;


var createScene = function(){
    
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(218/255, 216/255, 216/255);;
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -2, -1), scene);
    light.position = new BABYLON.Vector3(-2,4,5);
    light.intensity = 1;

    var cameraPosition = new BABYLON.Vector3(0,2,0);
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 1.98, 0.8, 8, cameraPosition, scene);
    camera.target = new BABYLON.Vector3(0,0.1,2.5);
    camera.alpha = -Math.PI / 1.98;
    //camera.attachControl(canvas, true);
    
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 100, width: 100, subdivisions: 1}, scene);    
    var material = new BABYLON.StandardMaterial("myMaterial", scene);
    material.diffuseColor = new BABYLON.Color3(218/255, 216/255, 216/255);
    material.specularColor = new BABYLON.Color3(0,0,0);
    ground.material = material;
    ground.position.y = 0;
    ground.receiveShadows = true;

    shadowGenerator = new BABYLON.ShadowGenerator(700, light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 80;    
    // var lightSphere = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
	// lightSphere.position = light.position;
	// lightSphere.material = new BABYLON.StandardMaterial("light", scene);
	// lightSphere.material.emissiveColor = new BABYLON.Color3(1, 1, 0);


    new cardMap("2",-2.0);
    new cardMap("3",-0.5);
    new cardMap("4",1.0);
    new cardMap("1",2.5);

    //var demoCard = new CardClass();
    return scene;
}

var advancedTexture ;

function getText(){
    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    for(var j=0,i=4;i<30;j++,i+=6){
        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = "";
        text1.color = "black";
        text1.fontSize = "30vw";
        text1.left = "2%";
        text1.paddingBottom = (i+3)+"%";
        text1.font = "Sans-serif";
        text1.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        text1.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(text1);    
        playerNameArray.push(text1);
    }  
}

function writeTempNames(){
    var recievedNameData = ['Anshul','Aastha','Abhishek','Ashu'];
    nameData = recievedNameData;
    for(var i = 0;i<4;i++){
        playerNameArray[i].text = recievedNameData[i]+" - 0";
    }
}

function writePlayerName(recievedNameData){
    nameData = recievedNameData;
    for(var i = 0;i<4;i++){
        if(recievedNameData[i] != null){
            playerNameArray[i].text = recievedNameData[i]+" - 0";
        }
    }
    if(recievedNameData.length == 4){
        initializeCards();
    }
}

function writeScore(scoreData){
    scoreData.forEach(function(data){
        playerNameArray[data.playerId].text = nameData[data.playerId]+" - "+data.totalScore;  
    });
}

function initilizeFirstPlayer(){
    for(var i=0,x=0,y=0.4,z=0;i<13;i++,x+=0.6,y+=0.01,z-=0.01){
        var tempCard = new CardClass(firstPlayerCardPosition.xAxis+x,                         
                                    y,
                                    firstPlayerCardPosition.zAxis+z,
                                    firstPlayerCardPosition.yAxisRotation,
                                    1.5,playerArray[0].cardArray[i]);
        firstPlayerCardArray.push(tempCard);
        shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
    }
}

function initilizeSecondPlayer(){
    for(var i=0,y=0.4,yr=0.1,x=0,z=0;i<13;i++,z+=0.4,yr+=0.02,x+=0.1){

        var tempCard = new CardClass(secondPlayerCardPosition.xAxis+x,                         
                                    y,
                                    secondPlayerCardPosition.zAxis+z,
                                    secondPlayerCardPosition.yAxisRotation-yr,
                                    0.3,playerArray[1].cardArray[i]);
        shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
        secondPlayerCardArray.push(tempCard);
    }
}

function initilizeThirdPlayer(){
    for(var i=0,x=0,y=0.4,z=0;i<13;i++,x+=0.6,y+=0.01,z-=0.000){
        var tempCard = new CardClass(thirdPlayerCardPosition.xAxis+x,                         
                                    y,
                                    thirdPlayerCardPosition.zAxis+z,
                                    thirdPlayerCardPosition.yAxisRotation,
                                    0.2,playerArray[2].cardArray[i]);
        thirdPlayerCardArray.push(tempCard);
        shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
        
    }
}

function initilizeFourthPlayer(){
    for(var i=0,y=0.4,yr=0.01,x=0,z=0;i<13;i++,z+=0.4,yr+=0.05,x-=0.1){
        var tempCard = new CardClass(fourthPlayerCardPosition.xAxis+x,                         
                                    y,
                                    fourthPlayerCardPosition.zAxis+z,
                                    fourthPlayerCardPosition.yAxisRotation+yr,
                                    0.1,playerArray[3].cardArray[i]);
        fourthPlayerCardArray.push(tempCard);
        shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
        
    }
    Tutor1();
}

async function Tutor1() {
    for(var i=0;i<13;i++){
        firstPlayerCardArray[i].playStartAnimation();
        await sleep(150);
        secondPlayerCardArray[i].playStartAnimation();
        await sleep(150);
        thirdPlayerCardArray[i].playStartAnimation();
        await sleep(150);
        fourthPlayerCardArray[i].playStartAnimation();
        await sleep(150);
     }
}


async function sleepFor(millisecond){
    await sleep(millisecond);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


scene = createScene();
scene.clearCachedVertexData();
scene.cleanCachedTextureBuffer();
getText();
getZoomImage();
getSkipImage();

scene.getEngine().setHardwareScalingLevel(0.5)
engine.runRenderLoop(function(){
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});
engine.doNotHandleContextLost = true;
