'use strict';
webApp.directive('ecommercecategories',['$rootScope','$http', function ($scope,$http) {
	$scope.ecommerce_cat_loading = true;
	$http({
		url		: sp['shop_category'],
		method 	: 'get',
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
	}).success(function(data){
		$scope.ecommerce_categories = data.ecommerce_categories;
		$scope.ecommerce_cat_loading = false;
		$scope.error_message = '';
		
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	})
	;
	return {
		restrict: 'E',
		transclude: true,
		templateUrl : 'views/directives/ecommerce/ecommerce_categories.html'
	};
  }]);
