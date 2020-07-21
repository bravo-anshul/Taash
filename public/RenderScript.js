var canvas = document.getElementById("renderCanvas"); 

var engine = new BABYLON.Engine(canvas, true);
var scene;

var firstPlayerCardArray = [];
var secondPlayerCardArray = [];
var thirdPlayerCardArray = [];
var fourthPlayerCardArray = [];

var text1;

var createScene = function(){
    
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(218/255, 216/255, 216/255);;
    //var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(4, 1, 1), scene);
    //var light2 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, -2, 1), scene);
    //light.position = new BABYLON.Vector3(9,4,2);
    light.intensity = 1;
    // var light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, 20, 5), scene);
    // light2.position = new BABYLON.Vector3(9,5,-1);
    // light2.intensity = 2;
    new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, 2, 0), scene);

    var cameraPosition = new BABYLON.Vector3(0,2,0);
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 1.98, 0.8, 8, cameraPosition, scene);
    camera.attachControl(canvas, true);
    
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 100, width: 100, subdivisions: 1}, scene);    
    var material = new BABYLON.StandardMaterial("myMaterial", scene);
    material.diffuseColor = new BABYLON.Color3(218/255, 216/255, 216/255);
    material.specularColor = new BABYLON.Color3(0,0,0);
    ground.material = material;
    ground.position.y = 0;
    ground.receiveShadows = true;

    var shadowGenerator = new BABYLON.ShadowGenerator(700, light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 64;    
    
    //getPlant();
    getText();
    

    initilizeFirstPlayer();
    initilizeSecondPlayer();
    initilizeThirdPlayer();
    initilizeFourthPlayer();

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

    async function Tutor2() {
        for(var i=0;i<13;i++){
            secondPlayerArray[i].playAnimation();
            await sleep(200);
        }
        
    }
    async function Tutor3() {
        for(var i=0;i<13;i++){
            thirdPlayerArray[i].playAnimation();
            await sleep(200);
        }
        
    }
    async function Tutor4() {
        for(var i=0;i<13;i++){
            fourthPlayerArray[i].playAnimation();
            await sleep(200);
        }
    }

    new cardMap("brickMap",-2.0);
    new cardMap("brickMap",-0.5);
    new cardMap("birdMap",1.0);
    new cardMap("birdMap",2.5);

    //var demoCard = new CardClass();

    Tutor1();
    // Tutor2();
    // Tutor3();
    // Tutor4();

    function initilizeFirstPlayer(){
        for(var i=0,x=0,y=0.4,z=0;i<13;i++,x+=0.6,y+=0.01,z-=0.01){
            var tempCard = new CardClass(firstPlayerCardPosition.xAxis+x,                         
                                        y,
                                        firstPlayerCardPosition.zAxis+z,
                                        firstPlayerCardPosition.yAxisRotation,
                                        1.5,playerArray[0].cardArray[i]);
            firstPlayerCardArray.push(tempCard);
            //shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
        }
    }

    function initilizeSecondPlayer(){
        for(var i=0,y=0.4,yr=0.1,x=0,z=0;i<13;i++,z+=0.4,yr+=0.02,x+=0.1){

            var tempCard = new CardClass(secondPlayerCardPosition.xAxis+x,                         
                                        y,
                                        secondPlayerCardPosition.zAxis+z,
                                        secondPlayerCardPosition.yAxisRotation-yr,
                                        0.3,playerArray[1].cardArray[i]);
            //shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
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
            //shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
            
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
            //shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
            
        }
    }

    return scene;
}

function getText(){
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    for(var i=0;i<4;i++){
        
    }

    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = "Anshul - 100";
    text1.color = "white";
    text1.fontSize = "20vw";
    text1.left = "2%";
    text1.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text1.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture.addControl(text1);    

    text2 = new BABYLON.GUI.TextBlock();
    text2.text = "Aashta - 190";
    text2.color = "Black";
    text2.fontSize = 24;
    advancedTexture.addControl(text2);    

    text3 = new BABYLON.GUI.TextBlock();
    text3.text = "Bharat - 50" ;
    text3.color = "Black";
    text3.fontSize = 24;
    advancedTexture.addControl(text3);    

    text4 = new BABYLON.GUI.TextBlock();
    text4.text = "Aashu - 40";
    text4.color = "Black";
    text4.fontSize = 24;
    advancedTexture.addControl(text4);    
}

function getPlant(){
    BABYLON.SceneLoader.Append("resources/plant/", "boxwood_plant.obj", scene, function (scene) {
        // Create a default arc rotate camera and light.
        scene.createDefaultCameraOrLight(true, true, true);

        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        scene.activeCamera.alpha += Math.PI;
    });
}

var elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
    engine.resize();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
