'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSeedApp
 */
webApp.directive('siteheader',['$http','$rootScope' , function ($http,$scope) {
	return {
		 restrict: 'E',
		 transclude: true,
		 templateUrl : 'views/directives/header.html'
	};
  }]);