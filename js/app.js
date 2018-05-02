"use strict";

var app = angular.module('app', ["ngRoute"]); // the app (1)

app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "index.html"
	})
	.when("/map", {
		templateUrl : "map.html"
	});
});

app.factory('DataService', function() { // the service (3)
	
	var dataService = {};

	var data = [];

	dataService.addData = function(d) {
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

app.controller('form-input', function($scope, DataService) { // controller for page 1 (2)

	$scope.submitForm = function() { // gets the form input (4)
		let data = {reg: $scope.reg, lat: $scope.lat, lon: $scope.lon};
		$scope.updateData(data);
	};

	$scope.updateData = function(data) {
		DataService.addData(data) // sends form input to service (4)
		$scope.data = DataService.getData();
	};
});

app.controller('mapping', function($scope, DataService) { // controller for page 2 (2)

	var map = L.map('map').setView([53, -7.2], 6);
	map.zoomControl.setPosition('topright');
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

	$scope.data = DataService.getData(); // getsdata from service

	if ($scope.data) { // plots data on map (5)
		for (var i = 0; i < $scope.data.length; i++) { 
		    L.marker([parseFloat($scope.data[i].lat), parseFloat($scope.data[i].lon)]).addTo(map);
		}
	}

});