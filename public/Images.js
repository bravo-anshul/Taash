var skipImage;

function getZoomImage(){
    var zoomImage = new BABYLON.GUI.Image("but", "resources/vision.png");
    zoomImage.width = "10%";
    zoomImage.height = "25%";
    zoomImage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    zoomImage.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    zoomImage.paddingBottom = "5%";
    zoomImage.paddingRight = "2%";
    advancedTexture.addControl(zoomImage);
    zoomImage.onPointerDownObservable.add(()=>{
        changeCamera();
    });
}

function getFullScreenImage(){
    var fullScreenImage = new BABYLON.GUI.Image("but", "resources/fullScreen.png");
    fullScreenImage.width = "10%";
    fullScreenImage.height = "20%";
    fullScreenImage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    fullScreenImage.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    fullScreenImage.paddingTop = "5%";
    fullScreenImage.paddingRight = "2%";
    advancedTexture.addControl(fullScreenImage);
    fullScreenImage.onPointerDownObservable.add(()=>{
        openFullscreen();
    });
}

function getSkipImage(){
    skipImage = new BABYLON.GUI.Image("but", "resources/close.png");
    skipImage.width = "15%";
    skipImage.height = "35%";
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