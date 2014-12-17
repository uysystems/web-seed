'use strict';
webApp.directive('ecommercebrands',['$rootScope','$http', function ($scope,$http) {
	$scope.ecommerce_barnd_loading = true;
	$http({
		url		: sp['shop_barnds'],
		method 	: 'get',
		cache 	: true,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.ecommerce_brands = data.ecommerce_brands;
		$scope.error_message = '';
		$scope.ecommerce_barnd_loading = false;
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	})
	;
	return {
		restrict: 'E',
		transclude: true,
		templateUrl : 'views/directives/ecommerce/ecommerce_brands.html'
	};
  }]);