function updateScoreBoard(scoreData){
    for(var i=1;i<5;i++){
        document.getElementById(i+'PlayerText').innerHTML = nameData[scoreData[i-1].playerId];
        if(i>1)
            document.getElementById(i+'PlayerScore').innerHTML = "+"+scoreData[i-1].currentScore;
    }
    displayCurrentScoreBox();
}

function displayCurrentScoreBox(){
    document.getElementById('currentScoreBox').style.display = "block";
    setTimeout(function() { hideCurrentScoreBox(); }, 10000);
}

function hideCurrentScoreBox(){
    document.getElementById('currentScoreBox').style.display = "none";
}

var elem = document.documentElement;
function openFullscreen() {
    fullScreenBoolean = true;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}
