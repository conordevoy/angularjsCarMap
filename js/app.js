"use strict";

var app = angular.module('app', ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "index.html"
	})
	.when("/map", {
		templateUrl : "map.html"
	});
});

app.factory('DataService', function() {
	
	var dataService = {};

	var data = [];

	dataService.changeData = function(d) {
		data.push({reg: d.reg, lat: d.lat, lon:d.lon});
		localStorage.setItem('data', JSON.stringify(data));
	}

	dataService.getData = function() {
		let json = localStorage.getItem('data');
		let data = JSON.parse(json);
		return data;
	}
	return dataService;
});

app.controller('form-input', function($scope, DataService) { // $rootScope

	$scope.submitForm = function() {
		let data = {reg: $scope.reg, lat: $scope.lat, lon: $scope.lon};
		$scope.updateData(data);
		$scope.data = DataService.getData();
	};

	$scope.updateData = function(data) {
		DataService.changeData(data)
	};
});

app.controller('mapping', function($scope, DataService) {

	$scope.data = DataService.getData();

	if ($scope.data) {
		for (var i = 0; i < $scope.data.length; i++) { 
		    L.marker([parseFloat($scope.data[i].lat), parseFloat($scope.data[i].lon)]).addTo(map);
		}
	}

});