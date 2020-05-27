function CardClass2(xAxis,yAxis,zAxis,cardRotationAngle){

    var path = [
        new BABYLON.Vector3(0, 0.1, 0),
        new BABYLON.Vector3(xAxis/2, 0.4, zAxis),
        new BABYLON.Vector3(xAxis, yAxis, zAxis),
    ]; 
    
    var catmullRom = BABYLON.Curve3.CreateCatmullRomSpline(
        path,
        60
    );

    var f = new BABYLON.Vector4(0.5,0, 1, 1); // front image = half the whole image along the width 
    var b = new BABYLON.Vector4(0,0, 0.5, 1); // back image = second half along the width     

    var card = BABYLON.MeshBuilder.CreatePlane("card", {height:1.5, width: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE, frontUVs: b, backUVs: f}, scene);
    card.rotation.x = -1.57;
    card.position.y = 0.1;

    var mat = new BABYLON.StandardMaterial("", scene);
    mat.diffuseTexture = new BABYLON.Texture("doubleRoiT.png", scene);
    mat.diffuseTexture.hasAlpha = true;
    card.material = mat;
    

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
    var endingAngle = 1.04666666667;
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
    animationGroup.onAnimationGroupEndObservable.add(function(){
        console.log("this.card.position.x");
    })
    animationGroup.addTargetedAnimation(animationPosition, card);
    animationGroup.addTargetedAnimation(animationRotation, card);
    animationGroup.addTargetedAnimation(animationYRotation, card);
	
    this.playAnimation = function(){
        animationGroup.play(true);   
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
