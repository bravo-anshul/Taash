var cameraMoved = false;
var ease = new BABYLON.CubicEase();
ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

function changeCamera() {
    cameraMoved = !cameraMoved;
    var cam = scene.activeCamera;

    BABYLON.Animation.CreateAndStartAnimation('at4', cam, 'position', 60, 120, cam.position, getCameraPosition(), 0, ease);
    //BABYLON.Animation.CreateAndStartAnimation('at5', cam, 'target', speed, 120, cam.target, targetEndPos, 0, ease);
    BABYLON.Animation.CreateAndStartAnimation('alpha', cam, 'alpha', 60, 120, -Math.PI / 1.98, -Math.PI / 1.98, 0, ease);
}

function getCameraPosition(){
    if(cameraMoved)
        return upCameraPosition;
    return downCameraPosition;
}