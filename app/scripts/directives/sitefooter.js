'use strict';
webApp.directive('sitefooter',['$rootScope','$http',function ($scope,$http) {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl : 'views/directives/footer.html'
	};
  }]);