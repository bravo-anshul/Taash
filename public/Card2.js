
function CardClass2(xAxis,yAxis,zAxis,cardRotationAngle,endingAngle){

    var cardOriginX = 0;
    var cardOriginY = 1;
    var cardOriginZ = 2;
    var endingYAxis = 1;


    var f = new BABYLON.Vector4(0.5,0, 1, 1); // front image = half the whole image along the width 
    var b = new BABYLON.Vector4(0,0, 0.5, 1); // back image = second half along the width     
    
    
    card = BABYLON.MeshBuilder.CreatePlane("card", {height:1.5, width:1, sideOrientation: BABYLON.Mesh.DOUBLESIDE, frontUVs: b, backUVs: f}, scene);
    card.rotation.x = -1.57;
    card.rotation.z = 0;
    card.position = new BABYLON.Vector3(cardOriginX,yAxis,cardOriginZ);
    

    // card.position.y = 0.01;
    // card.position.z = -3;

    var mat = new BABYLON.StandardMaterial("", scene);
    mat.diffuseTexture = new BABYLON.Texture("resources/blackCardBorder.png", scene);
    mat.specularColor = new BABYLON.Color3(0,0,0);
    mat.diffuseTexture.hasAlpha = true;
    card.material = mat;

    var path = [
        new BABYLON.Vector3(cardOriginX, yAxis, cardOriginZ),
        new BABYLON.Vector3(xAxis/2, 0.4, zAxis),
        new BABYLON.Vector3(xAxis, 1.5, zAxis),
    ]; 
    
    var catmullRom = BABYLON.Curve3.CreateCatmullRomSpline(
        path,
        60
    );

    var animationPosition = new BABYLON.Animation("animPos", "position", 150, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var animationRotation = new BABYLON.Animation("animRot", "rotation.x", 150, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);	
    var animationYRotation = new BABYLON.Animation("animRot", "rotation.y", 150, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);	
	
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

    var animationGroup = new BABYLON.AnimationGroup("Group");
    animationGroup.addTargetedAnimation(animationPosition, card);
    animationGroup.addTargetedAnimation(animationRotation, card);
    animationGroup.addTargetedAnimation(animationYRotation, card);

    //animationGroup.play(true);   
    this.playAnimation = function(){
        animationGroup.play(true);   
    };

    this.getCard = function(){
        return card;
    }

    
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
