var canvas = document.getElementById("renderCanvas"); 

var engine = new BABYLON.Engine(canvas, true);

var createScene = function(){
    
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(218/255, 216/255, 216/255);;
    //var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(4, 1, 1), scene);
    //var light2 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, 1), scene);
    //light.position = new BABYLON.Vector3(9,4,2);
    light.intensity = 1;
    var light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, 2, 0), scene);
    //light2.position = new BABYLON.Vector3(9,5,-1);
    light2.intensity = 2;

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

    var shadowGenerator = new BABYLON.ShadowGenerator(800, light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 64;    
    
    getFirstPlayerXAxis();

    var firstPlayerCardPosition = {
        xAxis : -3.7,
        yAxis : 3,
        zAxis : -1.8,
        yAxisRotation : 0
    }      
    var secondPlayerCardPosition = {
        xAxis : -7.5,
        yAxis : 3,
        zAxis : 1,
        yAxisRotation : 2.2
    }
    var thirdPlayerCardPosition = {
        xAxis : -3.5,
        yAxis : 2.2,
        zAxis : 7,
        yAxisRotation : 3
    }
    var fourthPlayerCardPosition = {
        xAxis : 7.5,
        yAxis : 2.5,
        zAxis : 1,
        yAxisRotation : 4
    }


    var firstPlayerArray = [];
    var secondPlayerArray = [];
    var thirdPlayerArray = [];
    var fourthPlayerArray = [];

    var cardsArray = [];


    for(var i=0,x=0,y=0.4,z=0;i<13;i++,x+=0.6,y+=0.01,z-=0.01){
        var tempCard = new CardClass(firstPlayerCardPosition.xAxis+x,                         
                                    y,
                                    firstPlayerCardPosition.zAxis+z,
                                    firstPlayerCardPosition.yAxisRotation,
                                    1.5);
        firstPlayerArray.push(tempCard);
        if(i<13){
            shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
        }
    }
    
    for(var i=0,y=1,yr=0.1,x=0,z=0;i<13;i++,z+=0.4,yr+=0.02,x+=0.1){

        var tempCard = new CardClass(secondPlayerCardPosition.xAxis+x,                         
                                    0,
                                    secondPlayerCardPosition.zAxis+z,
                                    secondPlayerCardPosition.yAxisRotation-yr,
                                    0.3);
        shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
        secondPlayerArray.push(tempCard);
    }

    for(var i=0,x=0,y=0.4,z=0;i<13;i++,x+=0.6,y+=0.01,z-=0.000){
        var tempCard = new CardClass(thirdPlayerCardPosition.xAxis+x,                         
                                    y,
                                    thirdPlayerCardPosition.zAxis+z,
                                    thirdPlayerCardPosition.yAxisRotation,
                                    0.2);
        thirdPlayerArray.push(tempCard);
        shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
        
    }

    for(var i=0,y=1,yr=0.01,x=0,z=0;i<13;i++,z+=0.4,yr+=0.05,x-=0.1){
        var tempCard = new CardClass(fourthPlayerCardPosition.xAxis+x,                         
                                    0,
                                    fourthPlayerCardPosition.zAxis+z,
                                    fourthPlayerCardPosition.yAxisRotation+yr,
                                    0.1);
        fourthPlayerArray.push(tempCard);
        shadowGenerator.getShadowMap().renderList.push(tempCard.getCard());
        
    }

    
    async function Tutor1() {
        for(var i=0;i<13;i++){
            firstPlayerArray[i].playAnimation();
            await sleep(150);
            secondPlayerArray[i].playAnimation();
            await sleep(150);
            thirdPlayerArray[i].playAnimation();
            await sleep(150);
            fourthPlayerArray[i].playAnimation();
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
    

    Tutor1();
    // Tutor2();
    // Tutor3();
    // Tutor4();

    

    return scene;
}
var scene = createScene();
scene.getEngine().setHardwareScalingLevel(0.5)
engine.runRenderLoop(function(){
    scene.render();
});
window.addEventListener('resize', function(){ console.log("resize");engine.resize(); });

function getFirstPlayerXAxis(){
    console.log(window.innerHeight);
    console.log((window.innerWidth/100) * 25);
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