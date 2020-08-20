var skipImage;

function getZoomImage(){
    console.log("zoom image");
    var zoomImage = new BABYLON.GUI.Image("but", "resources/vision.png");
    zoomImage.width = "10%";
    zoomImage.height = "140px";
    zoomImage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    zoomImage.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    zoomImage.paddingBottom = "5%";
    zoomImage.paddingRight = "2%";
    advancedTexture.addControl(zoomImage);
    zoomImage.onPointerDownObservable.add(()=>{
        changeCamera();
    });
}

function getSkipImage(){
    console.log("skip image");
    skipImage = new BABYLON.GUI.Image("but", "resources/stop.png");
    skipImage.width = "15%";
    skipImage.height = "140px";
    skipImage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    skipImage.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    skipImage.paddingBottom = "5%";
    skipImage.paddingRight = "2%";
    skipImage.isVisible = false;
    advancedTexture.addControl(skipImage);
}

function displaySkipImage(){
    skipImage.isVisible =true;
    setTimeout(function() { hideSkipImage(); }, 1000);
}

function hideSkipImage(){
    skipImage.isVisible = false;
}