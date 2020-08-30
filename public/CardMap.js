
function cardMap(map_name, xaxis){

    card = BABYLON.MeshBuilder.CreatePlane("card", {height:1.5, width:1,}, scene);
    card.rotation.x = 1.57;
    card.position = new BABYLON.Vector3(xaxis,0.1,2.5);

    var mat = new BABYLON.StandardMaterial("", scene);
    //mat.diffuseTexture = new BABYLON.Texture("resources/"+map_name+".png", scene);
    mat.diffuseTexture = new BABYLON.Texture("resources/cardMap"+map_name+".png", scene);
    mat.specularColor = new BABYLON.Color3(0,0,0);
    mat.diffuseTexture.hasAlpha = true;
    card.material = mat;
}