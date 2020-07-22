module.exports = {
	player : function(socketId, playerCount){
		this.socketId = socketId;
		this.playerCount = playerCount;
		this.name;
		this.cardArray = [];
		this.score = 0;
	}
};
