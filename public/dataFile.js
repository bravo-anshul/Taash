var heartCardValue = -2.0;
var spadeCardValue = -0.5;
var clubCardValue = 1.0;
var diamondCardValue = 2.5;

var firstPlayerCardPosition = {
    xAxis : -3.7,
    yAxis : 3,
    zAxis : -1.8,
    yAxisRotation : 0
}      
var secondPlayerCardPosition = {
    xAxis : -7.5,
    yAxis : 3,
    zAxis : 1,
    yAxisRotation : 2.2
}
var thirdPlayerCardPosition = {
    xAxis : -3.5,
    yAxis : 2.2,
    zAxis : 7,
    yAxisRotation : 3
}
var fourthPlayerCardPosition = {
    xAxis : 7.5,
    yAxis : 2.5,
    zAxis : 1,
    yAxisRotation : 4
}

function getTableCardPosition(cardValue){

    var x;
    var y = 0.15;
    var z;

    if(cardValue < 14){
        x = heartCardValue;
        z = -0.7 + (cardValue * 0.5);

    }
    else if(cardValue < 27){
        cardValue = cardValue - 13;
        x = spadeCardValue;
        z = -0.5 + (cardValue * 0.5);
    }
    else if(cardValue < 40){
        cardValue = cardValue - 26;
        x = clubCardValue;
        z = -0.5 + (cardValue * 0.5);
    }
    else if(cardValue < 53){
        cardValue = cardValue - 39;
        x = diamondCardValue;
        z = -0.5 + (cardValue * 0.5);
    }
    return new BABYLON.Vector3(x,y,z);
}

function getCardString(cardValue){
    var color;
    x = "red";
    if(cardValue < 14){
        x = "heartCardSkin";
        color = "white";
    }
    else if(cardValue < 27){
        cardValue = cardValue - 13;
        x = "spadeCardSkin";
        color = "white";
    }
    else if(cardValue < 40){
        cardValue = cardValue - 26;
        x = "clubCardSkin";
        color = "red";
    }
    else if(cardValue < 53){
        cardValue = cardValue - 39;
        x = "diamondCardSkin";
        color = "red";
    }

    if(cardValue == 1){
        cardValue = "A";
    }
    else if(cardValue == 11){
        cardValue = "J";
    }
    else if(cardValue == 12){
        cardValue = "Q";
    }
    else if(cardValue == 13){
        cardValue = "K";
    }

    var cardValues = {cardString: cardValue, skin : x, color : color};
    return cardValues;
}

function getServerCardValue(cardValue){
    var numericCardValue = cardValue;
    if(cardValue < 14){
        x = "heartCardSkin";
    }
    else if(cardValue < 27){
        cardValue = cardValue - 13;
        x = "spadeCardSkin";
    }
    else if(cardValue < 40){
        cardValue = cardValue - 26;
        x = "clubCardSkin";
    }
    else if(cardValue < 53){
        cardValue = cardValue - 39;
        x = "diamondCardSkin";
    }
    var cardValues = {value: cardValue, skin : x, numericCardValue : numericCardValue, playerId : playerId};

    return cardValues;
}