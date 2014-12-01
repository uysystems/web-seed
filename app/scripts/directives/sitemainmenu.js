'use strict';
webApp.directive('sitemainmenu',['$rootScope','$http', function ($scope,$http) {
	$http({
		method 	: 'get',
		url		: sp['layout'],
		cache 	: true,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.menu =data.menu;
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	})
	return {
		restrict: 'E',
		transclude: true,
		templateUrl : 'views/directives/mainmenu.html'
	};
  }]);