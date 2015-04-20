var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){

   this.addNewGame = function(gameObj) {
   	var url = "https://api.parse.com/1/classes/" + gameObj.homeTeam;
   	if (gameObj.homeTeamScore.parseInt() > gameObj.opponentScore.parseInt()) {
   		gameObj.won = true;
   	} else {
   		gameObj.won = false;
   	}
   	$http({
   		method: 'POST',
   		url: url,
   		data: gameObj
   	})
   }
   
  
   var dfd = $q.defer();
   this.getTeamData = function(team) {
      var url = 'https://api.parse.com/1/classes/' + team;
      $http ({
      	method: 'GET',
      	url: url
      }).then(function(data){
      	var results = data.data.results;
      	console.log(results);
      	var wins = 0;
      	var losses = 0;
      	for (var i = 0; i < results.length; i++) {
      		if (results[i].won) {
      			wins++;
      		} else if (!results[i].won) {
      			losses++;
      		}
      	}
      	results.wins = wins;
      	results.losses = losses;
      	dfd.resolve(data);
      })
       return dfd.promise;
   }



});