function CardClass(xAxis,yAxis,zAxis,cardRotationAngle){

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

    var mat = new BABYLON.StandardMaterial("", scene);
    mat.diffuseTexture = new BABYLON.Texture("doubleRoiT.png", scene);
    mat.diffuseTexture.hasAlpha = true;
    card.material = mat;
    card.rotation.x = -1.57;

    var animationPosition = new BABYLON.Animation("animPos", "position", 120, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var animationRotation = new BABYLON.Animation("animRot", "rotation.x", 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);	
    var animationYRotation = new BABYLON.Animation("animRot", "rotation.y", 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);	
	
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
    for(p = 0; p < catmullRom.getPoints().length; p++) {
        keysRotation.push({
            frame: p,
            value: startingXAngle 
        });
        if(p>40)
            startingXAngle+=0.029;
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


    // Create the animation group
    var animationGroup = new BABYLON.AnimationGroup("Group");
    animationGroup.addTargetedAnimation(animationPosition, card);
    animationGroup.addTargetedAnimation(animationRotation, card);
    animationGroup.addTargetedAnimation(animationYRotation, card);
	
	animationGroup.play(true);
    //BABYLON.Animation.CreateAndStartAnimation('yAxisAnimation', card1, 'rotation.x', 120, 120, -(Math.PI / 2), (Math.PI / 3));
    
}

function getYAxisRotationIncrementValue(endingAngle){
    var difference = endingAngle/40;
    return difference;
}
