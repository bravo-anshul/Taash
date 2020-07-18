
function CardClass(xAxis,yAxis,zAxis,cardRotationAngle,endingAngle,cValue){

    var cardOriginX = 3;
    var cardOriginZ = 5;

    var cardValue = cValue;
    var cardValues;

    var f = new BABYLON.Vector4(0.5,0, 1, 1); // front image = half the whole image along the width 
    var b = new BABYLON.Vector4(0,0, 0.5, 1); // back image = second half along the width     
    
    
    var card = BABYLON.MeshBuilder.CreatePlane("card", {height:1.5, width:1, sideOrientation: BABYLON.Mesh.DOUBLESIDE, frontUVs: b, backUVs: f}, scene);
    card.rotation.x = -1.57;
    card.position = new BABYLON.Vector3(cardOriginX,yAxis,cardOriginZ);

    // card.rotation.x = 1.27;
    // card.position = new BABYLON.Vector3(0,5,-4);


    setMaterial();

    var startAnimationGroup = new BABYLON.AnimationGroup("Group");
    assignStartAnimation();
    var playAnimationGroup = new BABYLON.AnimationGroup("Group");
    assignPlayAnimation();

    var playCard = function(){
        //playAnimationGroup.play(true);
        console.log(cardValues);
        socket.emit('cardPlayed',  getServerCardValue(cardValue));
    }

    card.actionManager = new BABYLON.ActionManager(scene);
    card.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  playCard));

   
    this.playStartAnimation = function(){
        assignPlayAnimation();
        startAnimationGroup.play(true);
    };

    this.playReturnAnimation = function(){
        playAnimationGroup.play(true);
    }

    this.getCard = function(){
        return card;
    }

    //////////////////////////////////////////////////////// end of class ///////////////////////////////////////////////////////////////////

    function assignStartAnimation(){
        var animationPosition = new BABYLON.Animation("animPos", "position", 150, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var animationRotation = new BABYLON.Animation("animRot", "rotation.x", 150, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);	
        var animationYRotation = new BABYLON.Animation("animRot", "rotation.y", 150, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);	
        
        var path = [
            new BABYLON.Vector3(cardOriginX, yAxis, cardOriginZ),
            new BABYLON.Vector3(xAxis/2, 0.4, zAxis),
            new BABYLON.Vector3(xAxis, 1, zAxis),
        ]; 
        
        var catmullRom = BABYLON.Curve3.CreateCatmullRomSpline(
            path,
            60
        );

        var keysPosition = []; 
        var keysRotation = [];
        var keysYAngle = [];

        for(p = 0; p < catmullRom.getPoints().length; p++) {
            keysPosition.push({
                frame: p,
                value: catmullRom.getPoints()[p]
            });
        }
    
        var startingXAngle = -1.57;
    
        var xAxisIncrementValue = getXAxisRotationIncrementValue(startingXAngle,endingAngle);
        for(p = 0; p < catmullRom.getPoints().length; p++) {
            keysRotation.push({
                frame: p,
                value: startingXAngle 
            });
            if(p>40)
                startingXAngle+=xAxisIncrementValue;
        }
    
        var yAngle = 0;
        var yAxisIncrementValue = getYAxisRotationIncrementValue(cardRotationAngle);
        for(p = 0; p < catmullRom.getPoints().length; p++) {
            keysYAngle.push({
                frame: p,
                value: yAngle 
            });
            if(p<40)
                yAngle+=yAxisIncrementValue;
        }
    
        animationPosition.setKeys(keysPosition);
        animationRotation.setKeys(keysRotation);
        animationYRotation.setKeys(keysYAngle);
    
        
        startAnimationGroup.addTargetedAnimation(animationPosition, card);
        startAnimationGroup.addTargetedAnimation(animationRotation, card);
        startAnimationGroup.addTargetedAnimation(animationYRotation, card);
    
    }

    function assignPlayAnimation(){
        var animationPosition = new BABYLON.Animation("animPos", "position", 100, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var animationRotation = new BABYLON.Animation("animRot", "rotation.x", 150, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);	
        var animationYRotation = new BABYLON.Animation("animRot", "rotation.y", 150, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);	
        
        var keysPosition = []; 
        var keysRotation = [];
        var keysYAngle = [];
        
        var path = [
            new BABYLON.Vector3(xAxis, 1, zAxis),
            getTableCardPosition(cardValue)
        ]; 
        
        var catmullRom = BABYLON.Curve3.CreateCatmullRomSpline(
            path,
            90
        );

        for(p = 0; p < catmullRom.getPoints().length; p++) {
            keysPosition.push({
                frame: p,
                value: catmullRom.getPoints()[p]
            });
        }
        
        var startingXAngle = endingAngle;
        var xAxisIncrementValue = getXAxisRotationIncrementValue(endingAngle, 1.57);
        for(p = 0; p < catmullRom.getPoints().length; p++) {
            keysRotation.push({
                frame: p,
                value: startingXAngle 
            });
            startingXAngle+=xAxisIncrementValue;
        }
    
        var yAngle = cardRotationAngle;
        var yAxisIncrementValue = cardRotationAngle/90;
        for(p = 0; p < catmullRom.getPoints().length; p++) {
            keysYAngle.push({
                frame: p,
                value: yAngle 
            });
            yAngle-=yAxisIncrementValue;
        }
    
        animationPosition.setKeys(keysPosition);
        animationRotation.setKeys(keysRotation);
        animationYRotation.setKeys(keysYAngle);
    
        
        playAnimationGroup.addTargetedAnimation(animationPosition, card);
        playAnimationGroup.addTargetedAnimation(animationRotation, card);
        playAnimationGroup.addTargetedAnimation(animationYRotation, card);



    }

    function setMaterial(){
        
        var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:1234,height:1000}, scene);   
        var textureContext = textureGround.getContext();
        
        var materialGround = new BABYLON.StandardMaterial("Mat", scene);    				
        materialGround.diffuseTexture = textureGround;
        //materialGround.diffuseTexture = new BABYLON.Texture("resources/blackCard2.png", scene);
        materialGround.specularColor = new BABYLON.Color3(0,0,0);
        materialGround.diffuseTexture.hasAlpha = true;
        card.material = materialGround;


        cardValues = getCardString(cValue);
        cValue = cardValues.cardString;
        var img = new Image();
        img.src = 'resources/cardSkin/diamondWhiteCardSkin.png';
        //img.src = 'resources/cardSkin/'+cardValues.skin+'.png';
        img.onload = function() {
            //Add image to dynamic texture
            textureContext.drawImage(this, 0,0);
            textureGround.update();	
    
            //Add text to dynamic texture
            var cornerFont = "80px cambria";
            textureGround.drawText(cValue, 60, 160, cornerFont, "black", null, true, true);
            textureGround.drawText(cValue, 500, 840, cornerFont, "black", null, true, true);

            var middleFont = "200px cambria";
            textureGround.drawText(cValue, 250, 560, middleFont, "black", null, true, true);
        }	

        // var mat = new BABYLON.StandardMaterial("", scene);
        // mat.diffuseTexture = new BABYLON.Texture("resources/blackCard2.png", scene);
        // mat.specularColor = new BABYLON.Color3(0,0,0);
        // mat.diffuseTexture.hasAlpha = true;
        // card.material = mat;
    }
    
}

function assignActionManager(mesh){
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, mesh.material, "emissiveColor", mesh.material.emissiveColor));
    mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, mesh.material, "emissiveColor", BABYLON.Color3.White()));
    mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, mesh, "scaling", new BABYLON.Vector3(1, 1, 1), 150));
    mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, mesh, "scaling", new BABYLON.Vector3(1.1, 1.1, 1.1), 150));
}

function onClickAction(mesh){
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function(){
            playReturnAnimation();
        })
    );
}

function getYAxisRotationIncrementValue(endingAngle){
    var difference = endingAngle/40;
    return difference;
}

function getXAxisRotationIncrementValue(startingXAngle,endingAngle){
    var difference = endingAngle - startingXAngle;
    difference = difference / 90;
    return difference;
}

function onConsole(cardValue){
    console.log(cardValue + "on console");
}
