var downCameraPosition = new BABYLON.Vector3(0.6,7.5,-6.0);
var upCameraPosition = new BABYLON.Vector3(0,9,0);

var heartCardValue = -2.0;
var spadeCardValue = -0.5;
var clubCardValue = 1.0;
var diamondCardValue = 2.5;

var cardsRestricitonArray = [8, 7, 8, 7, 8, 7, 8, 7];

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

var diamondImage = new Image();
diamondImage.src = 'resources/cardSkin/diamondWhiteBlackCardSkin.png';
var heartImage = new Image();
heartImage.src = 'resources/cardSkin/heartWhiteBlackCardSkin.png';
var spadeImage = new Image();
spadeImage.src = 'resources/cardSkin/spadeWhiteBlackCardSkin.png';
var clubImage = new Image();
clubImage.src = 'resources/cardSkin/clubWhiteBlackCardSkin.png';

function getTableCardPosition(cardValue){

    var x;
    var y = 0.15;
    var z;

    if(cardValue < 14){
        x = heartCardValue;
        z = -0.7 + (cardValue * 0.5);
        y = getYAxis(cardValue);
    }
    else if(cardValue < 27){
        cardValue = cardValue - 13;
        x = spadeCardValue;
        z = -0.7 + (cardValue * 0.5);
        y = getYAxis(cardValue);
    }
    else if(cardValue < 40){
        cardValue = cardValue - 26;
        x = clubCardValue;
        z = -0.7 + (cardValue * 0.5);
        y = getYAxis(cardValue);
    }
    else if(cardValue < 53){
        cardValue = cardValue - 39;
        x = diamondCardValue;
        z = -0.7 + (cardValue * 0.5);
        y = getYAxis(cardValue);
    }
    return new BABYLON.Vector3(x,y,z);
}

function getYAxis(cardValue){
  var y;
  if(cardValue == 7){
    y = 0.15;
  }
  else if(cardValue > 7){
    y = 0.15 + (cardValue/1000);
  }
  else if(cardValue < 7){
    y = 0.14 - (cardValue/1000);
  }
  return y;
}

function getCardString(cardValue){
    var color;
    var x;
    var cardImage;
    if(cardValue < 14){
        x = "heartCardSkin";
        color = "black";
        cardImage = heartImage;
    }
    else if(cardValue < 27){
        cardValue = cardValue - 13;
        x = "spadeCardSkin";
        color = "black";
        cardImage = spadeImage;
    }
    else if(cardValue < 40){
        cardValue = cardValue - 26;
        x = "clubCardSkin";
        color = "black";
        cardImage = clubImage;
    }
    else{
        cardValue = cardValue - 39;
        x = "diamondCardSkin";
        color = "black";
        cardImage = diamondImage;
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

    var cardValues = {cardString: cardValue, skin : x, color : color, cardImage : cardImage};
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

function getCardPlayingValue(numericCardValue){
  if(numericCardValue < 14){
  }
  else if(numericCardValue < 27){
    numericCardValue = numericCardValue - 13;
  }
  else if(numericCardValue < 40){
    numericCardValue = numericCardValue - 26;
  }
  else if(numericCardValue < 53){
    numericCardValue = numericCardValue - 39;
  }

  return numericCardValue;
}

function checkIfCardPlayable(cardValues) {
    switch (cardValues.skin) {
      case "heartCardSkin":
        if (cardValues.value <= 7) {
          if (cardValues.value == (cardsRestricitonArray[0] - 1)) {
            return true;
          }
        }
        else if (cardsRestricitonArray[0] != 8) {
          if (cardValues.value == (cardsRestricitonArray[1] + 1)) {
            return true;
          }
        }
        break;
      case "spadeCardSkin":
        if (cardValues.value <= 7) {
          if (cardValues.value == (cardsRestricitonArray[2] - 1)) {
            return true;
          }
        }
        else if (cardsRestricitonArray[2] != 8) {
          if (cardValues.value == (cardsRestricitonArray[3] + 1)) {
            return true;
          }
        }
        break;
      case "clubCardSkin":
        if (cardValues.value <= 7) {
          if (cardValues.value == (cardsRestricitonArray[4] - 1)) {
            return true;
          }
        }
        else if (cardsRestricitonArray[4] != 8) {
          if (cardValues.value == (cardsRestricitonArray[5] + 1)) {
            return true;
          }
        }
        break;
      case "diamondCardSkin":
        if (cardValues.value <= 7) {
          if (cardValues.value == (cardsRestricitonArray[6] - 1)) {
            return true;
          }
        }
        else if (cardsRestricitonArray[6] != 8) {
          if (cardValues.value == (cardsRestricitonArray[7] + 1)) {
            return true;
          }
        }
        break;
  
    }
  
    return false;
  }