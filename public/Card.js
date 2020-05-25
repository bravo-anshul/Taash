function card(xAxis,yAxis,zAxis){

    var path = [
        new BABYLON.Vector3(0, yAxis, 0),
        new BABYLON.Vector3(xAxis/2, yAxis+3, zAxis),
        new BABYLON.Vector3(xAxis, 5, zAxis),
        ]; //[{x:0, y:0, z: 0}, {x:10, y:00, z: 10}, {x:20, y:20, z: 20}, {x:30, y:30, z: 30}, {x:40, y:0, z: 35}];
    
    var catmullRom = BABYLON.Curve3.CreateCatmullRomSpline(
        path,
        60
    );

    var f = new BABYLON.Vector4(0.5,0, 1, 1); // front image = half the whole image along the width 
    var b = new BABYLON.Vector4(0,0, 0.5, 1); // back image = second half along the width     

    var card = BABYLON.MeshBuilder.CreatePlane("card", {height:1.5, width: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE, frontUVs: b, backUVs: f}, scene);

    // var xQuaternion = new BABYLON.Quaternion.RotationAxis(xAxis, xAngle);
    // card.rotationQuaternion = xQuaternion;
    
    var mat = new BABYLON.StandardMaterial("", scene);
    mat.diffuseTexture = new BABYLON.Texture("doubleRoiT.png", scene);
    mat.diffuseTexture.hasAlpha = true;

    card.material = mat;
    var animationPosition = new BABYLON.Animation("animPos", "position", 120, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
	var animationRotation = new BABYLON.Animation("animRot", "rotation.x", 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);	
	
    var keysPosition = []; 
    var keysRotation = [];

    for(p = 0; p < catmullRom.getPoints().length; p++) {
        keysPosition.push({
            frame: p,
            value: catmullRom.getPoints()[p]
        });
    }
    var startingAngle = -1.57;
    for(p = 0; p < catmullRom.getPoints().length; p++) {
        keysRotation.push({
            frame: p,
            value: startingAngle 
        });
        if(p>40)
            startingAngle+=0.029;
        console.log(p +""+ startingAngle);
    }

    animationPosition.setKeys(keysPosition);
    animationRotation.setKeys(keysRotation);

    // Create the animation group
    var animationGroup = new BABYLON.AnimationGroup("Group");
    animationGroup.addTargetedAnimation(animationPosition, card);
    animationGroup.addTargetedAnimation(animationRotation, card);
	
	animationGroup.play(true);
    //BABYLON.Animation.CreateAndStartAnimation('yAxisAnimation', card1, 'rotation.x', 120, 120, -(Math.PI / 2), (Math.PI / 3));
    
}
